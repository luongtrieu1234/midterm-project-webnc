import React, { useMemo } from 'react';
import GradeCompositionCard from './GradeCompositionCard';
import { useParams } from 'react-router';
import { useQuery } from 'react-query';
import { getGradeCompositionDetailById } from 'apis/grade.api';
import CommentList from './CommentList';

export default function GradeDetail() {
  // query
  const { gradeId } = useParams();

  const { data: gradeDetailData, refetch } = useQuery(['gradeDetailData', gradeId], () =>
    getGradeCompositionDetailById(gradeId)
  );
  const gradeDetail = useMemo(() => gradeDetailData?.data, [gradeDetailData]);
  console.log('gradeDetail:', gradeDetail);
  return (
    <div>
      <GradeCompositionCard
        gradeComposition={gradeDetail?.gradeComposition}
        explanation={{
          explanation: gradeDetail?.grade?.explanation,
          expectedGrade: gradeDetail?.grade?.expectedGrade,
        }}
      />
      <CommentList listComment={gradeDetail?.grade?.comments} refetch={refetch} />
    </div>
  );
}
