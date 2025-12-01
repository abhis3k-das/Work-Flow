export default function PageTitle({ title, subTitle }: { title: string; subTitle?: string }) {
  return (
    <div>
      <h1 className="page-title">{title}</h1>
      <p className="text-muted-foreground -translate-y-1.5 text-sm">{subTitle}</p>
    </div>
  );
}
