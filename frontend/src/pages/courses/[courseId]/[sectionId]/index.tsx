import { NextPage } from 'next'
// import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'

import { Layout } from '@/components/Layout'
import { SectionArticles, SectionQuizzes } from '@/features/section'
import { useGetApi } from '@/hooks/useApi'
import { CourseWithSections, SectionWithRelation } from '@/types'

// courses/[courseId]/[sectionId]のページ
const Courses: NextPage = () => {
  // const searchParams = useSearchParams()
  // const sectionId = searchParams.get('sectionId') || ''
  // const courseId = searchParams.get('courseId') || ''
  const router = useRouter()
  const { courseId = '', sectionId = '' } = router.query as {
    courseId?: string
    sectionId?: string
  }

  // ルーター未準備なら何も表示しない（誤判定防止）
  if (!router.isReady) {
    return <Layout />
  }

  // セクションを取得
  const { data: section } = useGetApi<SectionWithRelation>(
    `/sections/${sectionId}`,
  )
  // コースを取得
  const { data: course } = useGetApi<CourseWithSections>(`/courses/${courseId}`)

  // セクション、コースがない時
  if (!section || !sectionId) {
    return (
      <Layout>
        <p className='mt-200px text-center '>このセクションは存在しません</p>
      </Layout>
    )
  }

  const courseTitleName = course
    ? `${course.name}のセクション一覧`
    : 'セクション一覧'
  const typeName = section.type === 'quiz' ? '問題一覧' : '記事一覧'
  const titleName = `${section.name}の${typeName}`

  return (
    <Layout
      breadcrumbItems={[
        { title: 'コース一覧', href: '/courses' },
        { title: courseTitleName, href: `/courses/${courseId}` },
        { title: titleName, href: '' },
      ]}
    >
      <h1>{titleName}</h1>
      <div>
        {section.type === 'quiz' ? (
          <SectionQuizzes section={section} />
        ) : (
          <SectionArticles section={section} />
        )}
      </div>
    </Layout>
  )
}

export default Courses
