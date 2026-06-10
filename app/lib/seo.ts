import { services } from '@/app/data/services';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const service = services.find(
    (s) => s.slug === slug
  );

  return {
    title: service?.seoTitle,
    description: service?.seoDescription,
  };
}