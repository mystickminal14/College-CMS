// JournalEditorialBoard.tsx
import { motion } from 'framer-motion';
import { fadeUp } from '../../comp/animation';
import type { EditorialMember, HonoraryPosition } from '../../../pages/editorial-board/model/EditoralModel';
import useGetEditorialAll from '../../../pages/editorial-board/hooks/useGetEditortial';
import React from 'react';
import { 
  Crown, 
  Award, 
  UserCog, 
  Users, 
  FileText, 
  Briefcase 
} from 'lucide-react';

const positionConfig: Record<HonoraryPosition, { 
  title: string; 
  order: number; 
  bgColor: string; 
  textColor: string; 
  borderColor: string;
  icon: React.ReactNode;
}> = {
  CHIEF_PATRON: { 
    title: 'CHIEF PATRON', 
    order: 1, 
    bgColor: 'bg-purple-50', 
    textColor: 'text-purple-700', 
    borderColor: 'border-purple-200',
    icon: <Crown className="w-5 h-5" />
  },
  PATRON: { 
    title: 'PATRON', 
    order: 2, 
    bgColor: 'bg-blue-50', 
    textColor: 'text-blue-700', 
    borderColor: 'border-blue-200',
    icon: <Award className="w-5 h-5" />
  },
  EDITOR_IN_CHIEF: { 
    title: 'EDITOR-IN-CHIEF', 
    order: 3, 
    bgColor: 'bg-green-50', 
    textColor: 'text-green-700', 
    borderColor: 'border-green-200',
    icon: <UserCog className="w-5 h-5" />
  },
  ASSOCIATE_EDITOR: { 
    title: 'ASSOCIATE EDITOR(S)', 
    order: 4, 
    bgColor: 'bg-yellow-50', 
    textColor: 'text-yellow-700', 
    borderColor: 'border-yellow-200',
    icon: <Users className="w-5 h-5" />
  },
  MANAGING_EDITOR: { 
    title: 'MANAGING EDITOR', 
    order: 5, 
    bgColor: 'bg-orange-50', 
    textColor: 'text-orange-700', 
    borderColor: 'border-orange-200',
    icon: <FileText className="w-5 h-5" />
  },
  EDITORIAL_BOARD_MEMBER: { 
    title: 'EDITORIAL BOARD MEMBER(S)', 
    order: 6, 
    bgColor: 'bg-gray-50', 
    textColor: 'text-gray-700', 
    borderColor: 'border-gray-200',
    icon: <Briefcase className="w-5 h-5" />
  },
  ADVISOR: { 
    title: 'ADVISOR(S)', 
    order: 7, 
    bgColor: 'bg-pink-50', 
    textColor: 'text-pink-700', 
    borderColor: 'border-pink-200',
    icon: <Users className="w-5 h-5" />
  },
};

const JournalEditorialBoard = () => {
  const { data, isLoading } = useGetEditorialAll();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!data?.data) {
    return (
       <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <Users className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Editorial Board Members Found</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            The editorial board information is currently being updated. Please check back soon.
          </p>
        </div>
    );
  }

  const sortedMembers = [...data.data].sort((a, b) => {
    const orderA = positionConfig[a.honoraryPosition]?.order || 999;
    const orderB = positionConfig[b.honoraryPosition]?.order || 999;
    if (orderA !== orderB) return orderA - orderB;
    return a.name.localeCompare(b.name);
  });

  const groupedByPosition = sortedMembers.reduce<Record<HonoraryPosition, EditorialMember[]>>((acc, member) => {
    if (!acc[member.honoraryPosition]) acc[member.honoraryPosition] = [];
    acc[member.honoraryPosition].push(member);
    return acc;
  }, {} as Record<HonoraryPosition, EditorialMember[]>);

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

  return (
    <div className="space-y-12">
      {/* Header Section */}
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Editorial Board</h1>
        <p className="text-gray-600 max-w-3xl">
          Our distinguished editorial board comprises experts and leaders from academia and industry who guide the journal's direction and maintain the highest standards of scholarly publishing.
        </p>
      </motion.div>

      {/* Cards by Position */}
      {Object.keys(positionConfig)
        .sort((a, b) => positionConfig[a as HonoraryPosition].order - positionConfig[b as HonoraryPosition].order)
        .map((positionKey) => {
          const members = groupedByPosition[positionKey as HonoraryPosition];
          if (!members || members.length === 0) return null;
          const config = positionConfig[positionKey as HonoraryPosition];
          
          return (
            <motion.div
              key={positionKey}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Position Header */}
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${config.bgColor} ${config.textColor}`}>
                  {config.icon}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{config.title}</h2>
                  <p className="text-sm text-gray-600">
                    {members.length} member{members.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>

              {/* Cards Grid - 4 columns on large screens */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {members.map((member, index) => (
                  <motion.div
                    key={member.id || index}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className={`bg-white rounded-lg shadow-sm border ${config.borderColor} overflow-hidden hover:shadow-md transition-all duration-200 flex flex-col h-full`}
                  >
                    <div className="p-5 flex-1">
                      {/* Avatar and Name */}
                      <div className="flex items-start space-x-3 mb-3">
                        <div className={`w-12 h-12 rounded-full ${config.bgColor} flex items-center justify-center shrink-0`}>
                          <span className={`${config.textColor} font-bold`}>
                            {getInitials(member.name)}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-900 wrap-break-word">{member.name}</h3>
                          {member.designation && (
                            <p className="text-sm text-gray-700 wrap-break-word mt-1">{member.designation}</p>
                          )}
                        </div>
                      </div>

                      {/* Institution & Country - Full text display */}
                      <div className="space-y-2 mt-3">
                        {member.institution && (
                          <p className="text-sm text-gray-600 wrap-break-word leading-relaxed">
                            {member.institution}
                          </p>
                        )}
                        {member.country && (
                          <p className="text-sm text-gray-500 wrap-break-word">
                            {member.country}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Position Badge */}
                    <div className="mt-4 pt-3 border-t border-gray-100 px-5 pb-5">
                      <div className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium ${config.bgColor} ${config.textColor}`}>
                        {config.icon && React.cloneElement(config.icon as React.ReactElement,)}
                        <span className="whitespace-nowrap">{config.title.split('(')[0].trim()}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}

      {/* Empty State */}
      {sortedMembers.length === 0 && (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <Users className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Editorial Board Members Found</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            The editorial board information is currently being updated. Please check back soon.
          </p>
        </div>
      )}

      
    </div>
  );
};

export default JournalEditorialBoard;