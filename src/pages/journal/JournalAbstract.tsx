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



						</div>
					</div>

					{pdfUrl && (
						<div className="ml-4 shrink-0">
							<a
								href={pdfUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center px-4 py-2 text-sm font-medium
                    bg-blue-500 text-white rounded-lg border border-blue-200
                     transition-colors"
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


			</div>

			<div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
				<span className="text-xs text-gray-500">
					© LBEF Research Journal
				</span>
			</div>
		</div>
	);
};

export default JournalAbstract;