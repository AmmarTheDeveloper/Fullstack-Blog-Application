import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Props {
  variant?: "destructive" | "default";
  title: string;
  description?: string;
}

export function Message({ variant = "default", title, description }: Props) {
  return (
    <Alert variant={variant} className="max-w-[500px]">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      {description && <AlertDescription>{description}</AlertDescription>}
    </Alert>
  );
}
