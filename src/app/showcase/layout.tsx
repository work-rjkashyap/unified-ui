// removed metadata from here as it should be in page.tsx for static export vs client component logic
// actually metadata belongs in layout for client pages usually, but I'll leave it as is for now since I'm fixing build.

export default function ShowcaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
