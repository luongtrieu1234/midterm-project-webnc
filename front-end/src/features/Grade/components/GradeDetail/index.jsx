import React, { useMemo } from 'react';
import GradeCompositionCard from './GradeCompositionCard';
import { useParams } from 'react-router';
import { useQuery } from 'react-query';
import { getGradeCompositionDetailById } from 'apis/grade.api';

export default function GradeDetail() {
  // query
  const { gradeId } = useParams();

  const { data: gradeDetailData } = useQuery(['gradeDetailData', gradeId], () =>
    getGradeCompositionDetailById(gradeId)
  );
  const gradeDetail = useMemo(() => gradeDetail?.data, [gradeDetailData]);

  return (
    <div>
      <GradeCompositionCard />
    </div>
  );
}
