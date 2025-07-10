import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CgDetailsMore } from "react-icons/cg";
import { Textarea } from "../ui/textarea";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Book } from "@/interface/book.interface";

interface BookDetailsProps {
  book: Book;
}

export function BookDetails({ book }: BookDetailsProps) {
  return (
    <Dialog>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <DialogTrigger asChild>
                <CgDetailsMore className="cursor-pointer lg:text-2xl md:text-xl text-sm text-[#59b6e8]"></CgDetailsMore>
              </DialogTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Book details information</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <DialogContent className="lg:max-w-[700px] md:max-w-[600px] max-w-[425px]">
          <DialogHeader>
            <DialogTitle>'{book.title}' book Details information</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Title</Label>
              <Input
                value={book.title}
                className="cursor-default pointer-events-none"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Author</Label>
              <Input
                value={book.author}
                className="cursor-default pointer-events-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Genre</Label>
              <Input
                value={book.genre}
                className="cursor-default pointer-events-none"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">ISBN</Label>
              <Input
                value={book.isbn}
                className="cursor-default pointer-events-none"
              />
            </div>
          </div>
          <div className="grid w-full gap-3">
            <Label htmlFor="message">Description</Label>
            <Textarea
              value={book.description}
              className="cursor-default pointer-events-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Copies</Label>
              <Input
                value={book.copies}
                className="cursor-default pointer-events-none"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Available</Label>
              <Input
                value={book.available}
                className="cursor-default pointer-events-none"
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
    </Dialog>
  );
}
