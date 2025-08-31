import { Skeleton } from "./ui/skeleton";

type SkeletonSchemaProps = {
  grid: number;
};

const SkeletonSchema = ({ grid }: SkeletonSchemaProps) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: grid }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col gap-4 p-4 rounded-xl "
        >
          <Skeleton className="h-40 w-full rounded-xl" />
           <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonSchema;