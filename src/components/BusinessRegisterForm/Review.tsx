import { validateAllFormValuesAndMerge } from "@/lib/form/register-form-schema";
import axios from "axios";
import { ChevronLeft, Contact2, MapPin, Smartphone } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { MultiCaptureFormProps } from "./BusinessRegisterForm";
import { usePageContext } from "./BusinessRegisterPageContext";

interface ReviewProps {
  forms: MultiCaptureFormProps[];
}

// TODO: Make this dynamic
const Review: FC<ReviewProps> = ({ forms }) => {
  const { currentPage, prevPage, allFormValues } = usePageContext();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  if (currentPage !== forms.length + 1) return;

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      const validatedForms = validateAllFormValuesAndMerge(
        allFormValues,
        forms.map((form) => form.schema)
      );
      const resp = await axios.post("/api/register/business", validatedForms);
      toast({
        title: "Successfully created business account!",
        description: "Please login to continue.",
      });
      router.push("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast({
          variant: "destructive",
          title: "There was an error handling your registration.",
          description: `${error.response?.data.error}`,
        });
      } else {
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 flex flex-col h-full w-full">
      <div className="gap-4 space-y-1 leading-snug items-center">
        <h1 className="font-bold text-2xl">Review</h1>
        <h3 className="text-foreground/80">Are all the details correct?</h3>
      </div>
      <div className="flex flex-col justify-between h-full gap-5">
        <div className="flex gap-6 bg-accent rounded-sm p-5 border-accent border">
          <Contact2 />
          <div className="flex flex-col leading-tight -mt-[2px] text-secondary-foreground/80">
            <h3 className="uppercase text-secondary-foreground/80 text-sm font-semibold">
              {forms[0].title}
            </h3>
            {Object.keys(allFormValues[0] || {})?.map((key, idx) => (
              <p className="truncate max-w-sm" key={idx}>
                {!["password", "confirmPassword"].includes(key) &&
                  allFormValues[0][key]}
              </p>
            ))}
            {Object.keys(allFormValues[0] || {})?.length === 0 && (
              <p>This part of the form is not filled out yet</p>
            )}
          </div>
        </div>
        <div className="flex gap-6 bg-accent rounded-sm p-5 border-accent border">
          <Smartphone />
          <div className="flex flex-col leading-tight -mt-[2px] text-secondary-foreground/80">
            <h3 className="uppercase text-secondary-foreground/80 text-sm font-semibold">
              {forms[1].title}
            </h3>
            {Object.keys(allFormValues[1] || {})?.map((key, idx) => (
              <p className="truncate max-w-sm" key={idx}>
                {!["password", "confirmPassword"].includes(key) &&
                  allFormValues[1][key]}
              </p>
            ))}
            {Object.keys(allFormValues[1] || {})?.length === 0 && (
              <p>This part of the form is not filled out yet</p>
            )}
          </div>
        </div>
        <div className="flex gap-6 bg-accent rounded-sm p-5 border-accent border">
          <MapPin />
          <div className="flex flex-col leading-tight -mt-[2px] text-secondary-foreground/80">
            <h3 className="uppercase text-secondary-foreground/80 text-sm font-semibold">
              {forms[2].title}
            </h3>
            {Object.keys(allFormValues[2] || {})?.map((key, idx) => (
              <>
                {!["password", "confirmPassword"].includes(key) && (
                  <span key={idx}>
                    <p className="truncate max-w-sm">{allFormValues[2][key]}</p>
                  </span>
                )}
              </>
            ))}
            {Object.keys(allFormValues[2] || {})?.length === 0 && (
              <p>This part of the form is not filled out yet</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <Button variant="secondary" onClick={prevPage}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button onClick={handleSubmit} isLoading={isLoading}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Review;
