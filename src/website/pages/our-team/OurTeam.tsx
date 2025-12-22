import decoration from '../../../assets/decoration.png';
import Inspiration from './component/inspiration';
import TeamCard from './component/team-card';
import TeamCardSkeleton from './component/team-skeleton';
import useGetTeamsByDept from './hook/useGetDepartment';
import type { TeamMember } from './model/team-model';

const OurTeamWeb = () => {
    const { data, isLoading } = useGetTeamsByDept();
    const teamData = data?.data;
    const managementTeam = teamData?.MANAGEMENT || [];
    const administrationTeam = teamData?.ADMINISTRATION || [];
    const computingTeam = teamData?.COMPUTING || [];

    return (
        <div className="min-h-screen bg-gray-50">
           
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                <div className="max-w-8xl mx-auto text-center">
                    <div className="inline-flex items-center justify-center gap-2 mb-6 px-4 py-2 rounded-full bg-blue-50 border border-blue-100">
                        <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                        <span className="text-blue-600 font-medium text-sm">Academic Excellence Team</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
                        <span className="text-gray-900">Meet The </span>
                        <span className="relative inline-block">
                            <span className="text-blue-600 relative z-10"> Minds</span>
                            <img
                                src={decoration}
                                alt="Decoration"
                                className="absolute left-1/2 -translate-x-1/2 -bottom-1 sm:bottom-0 w-full h-3"
                            />
                        </span>{" "}
                        <br />

                        <span className="text-gray-900">Behind</span>
                        <span className="text-blue-600 relative z-10"> Academic </span>
                        <span className="text-gray-900">Excellence</span>


                    </h1>

                    <p className="text-sm md:text-xl text-gray-600 max-w-3xl mx-auto  leading-relaxed">
                        Meet the dedicated educators, administrators, and visionaries who transform our institution
                        into a beacon of quality education in Nepal. Our team combines decades of experience with
                        youthful innovation to create an unparalleled learning environment.
                    </p>


                </div>
            </div>



            <Inspiration />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Our <span className="text-blue-600">Expert Divisions</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Organized into specialized teams to ensure comprehensive academic excellence and institutional success
                        </p>
                    </div>

                    {/* Management Division */}
                    <div className="mb-20">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <div className="inline-flex items-center gap-2 mb-2 px-4 py-1 rounded-full bg-blue-100 border border-blue-200">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    <span className="text-blue-700 font-medium">Leadership Team</span>
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                                    Management
                                    <span className="relative inline-block ml-2">
                                        <span className="text-blue-600 relative z-10">Division</span>
                                        <img
                                            src={decoration}
                                            alt="Decoration"
                                            className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-full h-2"
                                        />
                                    </span>
                                </h3>

                                <p className="text-gray-600 mt-2">Strategic leadership and institutional governance</p>
                            </div>

                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {isLoading ? (
                                Array.from({ length: 3 }).map((_, i) => (
                                    <TeamCardSkeleton key={i} />
                                ))
                            ) : managementTeam.length > 0 ? (
                                managementTeam.map((member: TeamMember) => (
                                    <TeamCard key={member.id} member={member} />
                                ))
                            ) : null}
                        </div>
                    </div>

                    {/* Computation Division */}
                    <div className="mb-20">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <div className="inline-flex items-center gap-2 mb-2 px-4 py-1 rounded-full bg-green-100 border border-green-200">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span className="text-green-700 font-medium">Technology & Research</span>
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                                    Department of
                                    <span className="relative inline-block ml-2">
                                        <span className="text-blue-600 relative z-10">Computing</span>
                                        <img
                                            src={decoration}
                                            alt="Decoration"
                                            className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-full h-2"
                                        />
                                    </span>
                                </h3>

                                <p className="text-gray-600 mt-2">Technology education, research, and innovation</p>
                            </div>

                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {isLoading ? (
                                Array.from({ length: 3 }).map((_, i) => (
                                    <TeamCardSkeleton key={i} />
                                ))
                            ) : computingTeam.length > 0 ? (
                                computingTeam.map((member: TeamMember) => (
                                    <TeamCard key={member.id} member={member} />
                                ))
                            ) : null}
                        </div>
                    </div>

                    {/* Administration Division */}
                    <div>
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <div className="inline-flex items-center gap-2 mb-2 px-4 py-1 rounded-full bg-purple-100 border border-purple-200">
                                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                    <span className="text-purple-700 font-medium">Support & Operations</span>
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                                    Department of
                                    <span className="relative inline-block ml-2">
                                        <span className="text-blue-600 relative z-10">Administration</span>
                                        <img
                                            src={decoration}
                                            alt="Decoration"
                                            className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-full h-2"
                                        />
                                    </span>
                                </h3>

                                <p className="text-gray-600 mt-2">Comprehensive support services and operational excellence</p>
                            </div>

                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {isLoading ? (
                                Array.from({ length: 3 }).map((_, i) => (
                                    <TeamCardSkeleton key={i} />
                                ))
                            ) : administrationTeam.length > 0 ? (
                                administrationTeam.map((member: TeamMember) => (
                                    <TeamCard key={member.id} member={member} />
                                ))
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default OurTeamWeb;