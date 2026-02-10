"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ConfirmationDialogProps {
  open: boolean;
  answer: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmationDialog({
  open,
  answer,
  onConfirm,
  onCancel,
}: ConfirmationDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={(o) => !o && onCancel()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl text-center">
            Bist du sicher?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-xl">
            Deine Antwort:{" "}
            <span className="font-bold text-foreground">{answer}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col sm:flex-row gap-2">
          <AlertDialogCancel
            onClick={onCancel}
            className="text-lg min-h-[48px]"
          >
            Nochmal schauen
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="text-lg min-h-[48px]"
          >
            Ja, abschicken!
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
