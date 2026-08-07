import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { IMAGE_URL } from "../../constants";
import useGetJournalDetails from "./hooks/details/useGetJournalDetails";
import {
	makeJournalSlug,
	makeJournalUrl,
} from "../../website/pages/journal/journalUrl";
import type { JournalDetailsPayload } from "./model/JournalModel";

const JournalAbstract = () => {
	const location = useLocation();
	const { id, slug } = useParams<{ id: string; slug?: string }>();

	// The article is passed via router state when navigating from the issue list,
	// but a shared/refreshed URL has no state — fall back to fetching the issue
	// and matching the article by its slug.
	const stateArticle: JournalDetailsPayload | undefined =
		location.state?.article;

	const { data, isLoading } = useGetJournalDetails(
		stateArticle ? "" : id ?? ""
	);

	const article =
		stateArticle ??
		(data?.data ?? []).find((item) =>
			slug
				? makeJournalSlug(item.pageNo) === slug || String(item.id) === slug
				: false
		);

	const pdfUrl = makeJournalUrl(article?.pageNo) || (article?.link ? `${IMAGE_URL}${article.link}` : "");

	// A DOI may be stored as a full URL or as a bare identifier (10.xxxx/yyyy).
	const doi = article?.doi?.trim();
	const doiHref = doi
		? /^https?:\/\//i.test(doi)
			? doi
			: `https://doi.org/${doi.replace(/^doi:\s*/i, "")}`
		: "";

	const howToCite = article?.howToCite?.trim();
	const imageUrl = article?.image ? `${IMAGE_URL}${article.image}` : "";

	const [copied, setCopied] = useState(false);
	const [imageFailed, setImageFailed] = useState(false);
	const [zoomed, setZoomed] = useState(false);

	// Close the enlarged cover on Escape, and stop the page behind it scrolling.
	useEffect(() => {
		if (!zoomed) return;

		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") setZoomed(false);
		};

		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		document.addEventListener("keydown", onKeyDown);

		return () => {
			document.body.style.overflow = previousOverflow;
			document.removeEventListener("keydown", onKeyDown);
		};
	}, [zoomed]);

	const handleCopyCitation = async () => {
		if (!howToCite) return;
		try {
			await navigator.clipboard.writeText(howToCite);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch {
			// Clipboard is unavailable outside a secure context — leave the text
			// on screen for the reader to select manually.
			setCopied(false);
		}
	};

	if (isLoading) {
		return (
			<div className="bg-white rounded-xl border border-gray-200 p-10 space-y-3">
				{[...Array(4)].map((_, i) => (
					<div key={i} className="animate-pulse bg-gray-200 h-6 rounded-lg" />
				))}
			</div>
		);
	}

	if (!article) {
		return (
			<div className="bg-white rounded-xl border border-gray-200 p-10 text-center">
				<h2 className="text-lg font-semibold text-gray-700">
					Abstract Not Available
				</h2>
				<p className="text-sm text-gray-500 mt-2">
					Please open the abstract from the issue details page.
				</p>
			</div>
		);
	}

	return (
		<>
		<div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
			<div className="px-6 py-6 border-b border-gray-200 bg-gray-50">
				<div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
					<div className="flex-1">
						<h1 className="text-2xl font-bold text-gray-800 leading-snug">
							{article.title}
						</h1>

						<div className="mt-4 space-y-2 text-sm text-gray-600">
							<div>
								<span className="font-medium">Author(s): </span>
								{article.authors?.join(", ")}
							</div>

							{article.pages && (
								<div>
									<span className="font-medium">Pages: </span>
									{article.pages}
								</div>
							)}

							{article.country && (
								<div>
									<span className="font-medium">Country: </span>
									{article.country}
								</div>
							)}

							{article.keywords && article.keywords.length > 0 && (
								<div>
									<span className="font-medium">Keyword(s): </span>
									{article.keywords.join(", ")}
								</div>
							)}

							{doiHref && (
								<div>
									<span className="font-medium">DOI: </span>
									<a
										href={doiHref}
										className="text-blue-600 underline underline-offset-2 decoration-blue-400 hover:text-blue-800 hover:decoration-blue-800 wrap-break-words cursor-pointer"
									>
										{doi}
									</a>
								</div>
							)}

						</div>
					</div>

					{(pdfUrl || (imageUrl && !imageFailed)) && (
						<div className="sm:ml-4 shrink-0 flex flex-col items-center gap-3 w-full sm:w-auto">
							{imageUrl && !imageFailed && (
								<button
									type="button"
									onClick={() => setZoomed(true)}
									aria-label="Enlarge cover image"
									className="group relative w-36 sm:w-40 block rounded-lg overflow-hidden border border-gray-200 shadow-md hover:shadow-xl transition-shadow"
								>
									<img
										src={imageUrl}
										alt={article.title || "Journal article cover"}
										loading="lazy"
										onError={() => setImageFailed(true)}
										className="w-full aspect-3/4 object-cover bg-gray-100"
									/>

									<span className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/25 transition-colors">
										<svg
											className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M21 21l-4.35-4.35M11 8v6m-3-3h6m5 0a8 8 0 11-16 0 8 8 0 0116 0z"
											/>
										</svg>
									</span>
								</button>
							)}

							{pdfUrl && (
								<a
									href={pdfUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium
                    bg-blue-500 hover:bg-blue-600 text-white rounded-lg border border-blue-200
                     transition-colors w-36 sm:w-40"
								>
									<svg
										className="w-4 h-4 mr-2"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
										/>
									</svg>
									PDF Format
								</a>
							)}
						</div>
					)}
				</div>
			</div>

			<div className="px-6 py-4 space-y-6">
				<div>
					<h2 className="text-lg font-semibold text-gray-800 mb-3">
						Abstract
					</h2>
					<p className="text-gray-700 leading-relaxed whitespace-pre-line">
						{article.abstract}
					</p>
				</div>

				{howToCite && (
					<section className="rounded-xl border border-blue-100 bg-blue-50/50 overflow-hidden">
						<header className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-blue-100 bg-blue-50">
							<h2 className="flex items-center text-sm font-semibold uppercase tracking-wide text-blue-800">
								<svg
									className="w-4 h-4 mr-2"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
									/>
								</svg>
								How to Cite
							</h2>
							<button
								onClick={handleCopyCitation}
								className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md border border-blue-200 bg-white text-blue-700 hover:bg-blue-100 transition-colors cursor-pointer"
							>
								{copied ? (
									<>
										<svg
											className="w-3.5 h-3.5"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M5 13l4 4L19 7"
											/>
										</svg>
										Copied
									</>
								) : (
									<>
										<svg
											className="w-3.5 h-3.5"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
											/>
										</svg>
										Copy
									</>
								)}
							</button>
						</header>

						<p className="px-4 py-3 text-sm text-gray-800 leading-relaxed whitespace-pre-line wrap-break-words">
							{howToCite}
						</p>
					</section>
				)}

			</div>

			<div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
				<span className="text-xs text-gray-500">
					© LBEF Research Journal
				</span>
			</div>
		</div>

		{zoomed && imageUrl && !imageFailed && (
			<div
				role="dialog"
				aria-modal="true"
				aria-label="Cover image"
				onClick={() => setZoomed(false)}
				className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 sm:p-8"
			>
				<button
					type="button"
					onClick={() => setZoomed(false)}
					aria-label="Close"
					className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/25 transition-colors"
				>
					<svg
						className="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>

				<img
					src={imageUrl}
					alt={article.title || "Journal article cover"}
					onClick={(e) => e.stopPropagation()}
					className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl cursor-default"
				/>
			</div>
		)}
		</>
	);
};

export default JournalAbstract;