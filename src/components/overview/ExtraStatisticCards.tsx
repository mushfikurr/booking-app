export default function ExtraStatisticCards() {
  return (
    <div className="flex-col flex max-h-full gap-3 flex-grow">
      <div className="border border-border p-3 rounded-lg flex flex-col w-full flex-grow">
        <div className="space-y-1">
          <h5 className="text-muted-foreground text-sm">Estimated earnings</h5>
          <h3 className="text-2xl">£250</h3>
        </div>
      </div>
      <div className="border border-border p-3 rounded-lg flex flex-col w-full flex-grow">
        <div className="space-y-1">
          <h5 className="text-muted-foreground text-sm">Estimated earnings</h5>
          <h3 className="text-xl">£250</h3>
        </div>
      </div>
    </div>
  );
}
