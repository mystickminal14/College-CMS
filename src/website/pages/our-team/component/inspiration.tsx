import bgImage from '../../../../assets/inspiration/sir.png';

const Inspiration = () => {
    return (
        <div className="bg-linear-to-b from-white to-blue-50 py-8 md:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-blue-100 border border-blue-200">
                            <span className="text-blue-700 font-medium">Our Guiding Light</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Source of <span className="text-blue-600">Inspiration</span>
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Visionary leader who laid the foundation for educational excellence in Nepal
                        </p>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start lg:items-start">
                        {/* Founder Profile Card */}
                        <div className="bg-white w-full lg:w-auto rounded-xl shadow p-4 lg:p-6">
                            <div className="w-full max-w-sm mx-auto">
                                <div className="aspect-square overflow-hidden rounded-lg group">
                                    <img
                                        src={bgImage}
                                        alt="Founder"
                                        className="w-full h-full object-cover object-top rounded-lg transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>

                                <h3 className="text-lg lg:text-xl font-bold text-gray-900 mt-4">
                                    Late Mr. Parmananda Kejriwal
                                </h3>
                                <p className="text-sm lg:text-base text-gray-700 mt-1">
                                    Founder of LBEF Group of Institutions
                                </p>
                                <div className="mt-3 flex items-center gap-2">
                                    <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-blue-600 font-medium text-sm">Legacy Since 1995</span>
                                </div>
                            </div>
                        </div>


                        <div className="flex-1">
                            {/* Foundation Story */}
                            <div className="mb-8">
                                <h4 className="font-bold text-gray-900 mb-4 text-xl">Foundation</h4>
                                <p className="text-gray-600">
                                    Late Mr. Parmanand Kejriwal, an esteemed educationist and social worker,
                                    conceived the LBEF Group of Institutions with a revolutionary vision to
                                    transform education in Nepal.
                                </p>
                            </div>

                            {/* Quote Box */}
                            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 lg:p-8 rounded-r-lg">
                                <svg className="w-8 h-8 text-blue-400 mb-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                                <blockquote className="text-base lg:text-md italic text-gray-700 mb-4">
                                    "Education is the most powerful weapon which you can use to change the world.
                                    Our mission is to make quality education accessible to every deserving student,
                                    breaking economic barriers and building a brighter future for Nepal."
                                </blockquote>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                    <div>
                                        <footer className="text-blue-600 font-medium">
                                            — Late Mr. Parmanand Kejriwal
                                        </footer>
                                        <p className="text-sm text-gray-500 mt-1">Founder's Guiding Principle</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm text-blue-600 font-medium">Est. 1995</div>
                                        <div className="text-xs text-gray-500">Legacy Continues</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Inspiration
