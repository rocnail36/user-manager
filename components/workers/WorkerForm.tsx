import { z } from "zod";

import { useState, useTransition } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useValidatedForm } from "@/lib/hooks/useValidatedForm";

import { type Action, cn } from "@/lib/utils";
import { type TAddOptimistic } from "@/app/(app)/workers/useOptimisticWorkers";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useBackPath } from "@/components/shared/BackButton";





import { type Worker, insertWorkerParams } from "@/lib/db/schema/workers";
import {
  createWorkerAction,
  deleteWorkerAction,
  updateWorkerAction,
} from "@/lib/actions/workers";


const WorkerForm = ({
  
  worker,
  openModal,
  closeModal,
  addOptimistic,
  postSuccess,
}: {
  worker?: Worker | null;
  
  openModal?: (worker?: Worker) => void;
  closeModal?: () => void;
  addOptimistic?: TAddOptimistic;
  postSuccess?: () => void;
}) => {
  const { errors, hasErrors, setErrors, handleChange } =
    useValidatedForm<Worker>(insertWorkerParams);
  const editing = !!worker?.id;
  
  const [isDeleting, setIsDeleting] = useState(false);
  const [pending, startMutation] = useTransition();

  const router = useRouter();
  const backpath = useBackPath("workers");


  const onSuccess = (
    action: Action,
    data?: { error: string; values: Worker },
  ) => {
    const failed = Boolean(data?.error);
    if (failed) {
      openModal && openModal(data?.values);
      toast.error(`Failed to ${action}`, {
        description: data?.error ?? "Error",
      });
    } else {
      router.refresh();
      postSuccess && postSuccess();
      toast.success(`Worker ${action}d!`);
      if (action === "delete") router.push(backpath);
    }
  };

  const handleSubmit = async (data: FormData) => {
    setErrors(null);

    const payload = Object.fromEntries(data.entries());
    const workerParsed = await insertWorkerParams.safeParseAsync({  ...payload });
    if (!workerParsed.success) {
      setErrors(workerParsed?.error.flatten().fieldErrors);
      return;
    }

    closeModal && closeModal();
    const values = workerParsed.data;
    const pendingWorker: Worker = {
      updatedAt: worker?.updatedAt ?? new Date(),
      createdAt: worker?.createdAt ?? new Date(),
      id: worker?.id ?? "",
      userId: worker?.userId ?? "",
      ...values,
    };
    try {
      startMutation(async () => {
        addOptimistic && addOptimistic({
          data: pendingWorker,
          action: editing ? "update" : "create",
        });

        const error = editing
          ? await updateWorkerAction({ ...values, id: worker.id })
          : await createWorkerAction(values);

        const errorFormatted = {
          error: error ?? "Error",
          values: pendingWorker 
        };
        onSuccess(
          editing ? "update" : "create",
          error ? errorFormatted : undefined,
        );
      });
    } catch (e) {
      if (e instanceof z.ZodError) {
        setErrors(e.flatten().fieldErrors);
      }
    }
  };

  return (
    <form action={handleSubmit} onChange={handleChange} className={"space-y-8"}>
      {/* Schema fields start */}
              <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.name ? "text-destructive" : "",
          )}
        >
          Name
        </Label>
        <Input
          type="text"
          name="name"
          className={cn(errors?.name ? "ring ring-destructive" : "")}
          defaultValue={worker?.name ?? ""}
        />
        {errors?.name ? (
          <p className="text-xs text-destructive mt-2">{errors.name[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>
        <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.salary ? "text-destructive" : "",
          )}
        >
          Salary
        </Label>
        <Input
          type="text"
          name="salary"
          className={cn(errors?.salary ? "ring ring-destructive" : "")}
          defaultValue={worker?.salary ?? ""}
        />
        {errors?.salary ? (
          <p className="text-xs text-destructive mt-2">{errors.salary[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>
        <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.ci ? "text-destructive" : "",
          )}
        >
          Ci
        </Label>
        <Input
          type="text"
          name="ci"
          className={cn(errors?.ci ? "ring ring-destructive" : "")}
          defaultValue={worker?.ci ?? ""}
        />
        {errors?.ci ? (
          <p className="text-xs text-destructive mt-2">{errors.ci[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>
        <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.adress ? "text-destructive" : "",
          )}
        >
          Adress
        </Label>
        <Input
          type="text"
          name="adress"
          className={cn(errors?.adress ? "ring ring-destructive" : "")}
          defaultValue={worker?.adress ?? ""}
        />
        {errors?.adress ? (
          <p className="text-xs text-destructive mt-2">{errors.adress[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>
        <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.phoneNumber ? "text-destructive" : "",
          )}
        >
          Phone Number
        </Label>
        <Input
          type="text"
          name="phoneNumber"
          className={cn(errors?.phoneNumber ? "ring ring-destructive" : "")}
          defaultValue={worker?.phoneNumber ?? ""}
        />
        {errors?.phoneNumber ? (
          <p className="text-xs text-destructive mt-2">{errors.phoneNumber[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>
      {/* Schema fields end */}

      {/* Save Button */}
      <SaveButton errors={hasErrors} editing={editing} />

      {/* Delete Button */}
      {editing ? (
        <Button
          type="button"
          disabled={isDeleting || pending || hasErrors}
          variant={"destructive"}
          onClick={() => {
            setIsDeleting(true);
            closeModal && closeModal();
            startMutation(async () => {
              addOptimistic && addOptimistic({ action: "delete", data: worker });
              const error = await deleteWorkerAction(worker.id);
              setIsDeleting(false);
              const errorFormatted = {
                error: error ?? "Error",
                values: worker,
              };

              onSuccess("delete", error ? errorFormatted : undefined);
            });
          }}
        >
          Delet{isDeleting ? "ing..." : "e"}
        </Button>
      ) : null}
    </form>
  );
};

export default WorkerForm;

const SaveButton = ({
  editing,
  errors,
}: {
  editing: Boolean;
  errors: boolean;
}) => {
  const { pending } = useFormStatus();
  const isCreating = pending && editing === false;
  const isUpdating = pending && editing === true;
  return (
    <Button
      type="submit"
      className="mr-2"
      disabled={isCreating || isUpdating || errors}
      aria-disabled={isCreating || isUpdating || errors}
    >
      {editing
        ? `Sav${isUpdating ? "ing..." : "e"}`
        : `Creat${isCreating ? "ing..." : "e"}`}
    </Button>
  );
};
