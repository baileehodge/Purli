import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Download,
    ArrowLeft,
    BookOpen,
    User,
    Tag,
    Calendar,
    Star
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { insertWaitlistSchema } from "@shared/schema";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/form";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import books from "../data/books.json";
// Sample book data - in a real app, this would come from an API

export default function BookDetail() {
    const { id } = useParams();
    const { toast } = useToast();
    const [downloading, setDownloading] = useState(false);

    // Find the book with the matching ID
    const book = books.find((b) => b.id === Number(id));

    if (!book) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-off-white">
                <Card className="w-full max-w-md">
                    <CardContent className="p-6">
                        <h1 className="text-2xl font-bold text-deep-navy mb-4">
                            Book Not Found
                        </h1>
                        <p className="text-deep-navy/70 mb-6">
                            The book you're looking for doesn't exist or has
                            been removed.
                        </p>
                        <Button asChild>
                            <Link to="/">Return Home</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const form = useForm({
        resolver: zodResolver(insertWaitlistSchema),
        defaultValues: {
            email: "",
            fullName: "",
            Hp: "",
            source: encodeURIComponent(book.title)
        }
    });

    const joinWaitlist = useMutation({
        mutationFn: async (data: {
            email: string;
            fullName: string;
            Hp: string;
            source: string;
        }) => {
            if (data.Hp !== "") {
                console.log("Spam detected! Blocking submission.");
                throw new Error("Spam detected! Submission blocked.");
            } else {
                await fetch("/server/addUser.php", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                });
            }
        },
        onSuccess: () => {
            toast({
                title: "Success!",
                description: "You've been added to the waitlist."
            });
            form.reset();
        },
        onError: (error: Error) => {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive"
            });
        }
    });

    const handleDownload = () => {
        setDownloading(true);

        // Simulate download delay
        setTimeout(() => {
            setDownloading(false);
            toast({
                title: "Download Complete",
                description: `${book.title} has been downloaded successfully.`
            });
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-off-white py-12">
            <div className="container mx-auto px-4">
                <div className="mb-6">
                    <Button variant="ghost" asChild className="text-deep-navy">
                        <Link to="/">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Home
                        </Link>
                    </Button>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Book Cover */}
                    <div>
                        <Card className="overflow-hidden">
                            <CardContent className="p-0">
                                <AspectRatio ratio={2 / 3}>
                                    <img
                                        src={book.cover}
                                        alt={book.title}
                                        className="object-cover w-full h-full"
                                    />
                                </AspectRatio>
                            </CardContent>
                        </Card>

                        <div className="mt-6">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="bg-faded-blue text-deep-navy hover:bg-soft-clay hover:text-white"
                                    >
                                        Download Book
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle className="text-2xl font-bold text-deep-navy">
                                            Want a Purli version of {book.title}?
                                        </DialogTitle>
                                        <DialogDescription className="text-deep-navy/80 pt-4">
                                            Signup on our waitlist and we'll notify you when
                                            it's available. 
                                        </DialogDescription>
                                    </DialogHeader>
                                    <Form {...form}>
                                        <form
                                            onSubmit={form.handleSubmit((data) =>
                                                joinWaitlist.mutate(data)
                                            )}
                                            className="space-y-4"
                                        >
                                            <FormField
                                                control={form.control}
                                                name="fullName"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="Full Name"
                                                                {...field}
                                                                className="border-soft-gray focus:border-faded-blue"
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="email"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="Email"
                                                                type="email"
                                                                {...field}
                                                                className="border-soft-gray focus:border-faded-blue"
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="Hp"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="Address"
                                                                {...field}
                                                                className="border-soft-gray focus:border-faded-blue hidden"
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <Button
                                                id="submitButton"
                                                type="submit"
                                                className="w-full bg-faded-blue hover:bg-soft-clay text-deep-navy font-medium"
                                                disabled={joinWaitlist.isPending}
                                            >
                                                {joinWaitlist.isPending
                                                    ? "Joining..."
                                                    : "Join the Waitlist"}
                                            </Button>
                                        </form>
                                    </Form>
                                </DialogContent>
                            </Dialog>
                           {/*} <Button
                                className="w-full bg-faded-blue hover:bg-soft-clay text-deep-navy font-medium"
                                onClick={handleDownload}
                                disabled={downloading}
                            >
                                {downloading ? (
                                    "Downloading..."
                                ) : (
                                    <>
                                        <Download className="mr-2 h-4 w-4" />
                                        Download Book
                                    </>
                                )}
                            </Button>*/}
                        </div>
                    </div>

                    {/* Book Details */}
                    <div className="md:col-span-2">
                        <h1 className="text-3xl md:text-4xl font-bold text-deep-navy mb-2">
                            {book.title}
                        </h1>
                        <h2 className="text-xl text-deep-navy/80 mb-4">
                            by {book.author}
                        </h2>

                        <div className="flex items-center gap-2 mb-6">
                            <Badge className="bg-faded-blue text-deep-navy">
                                {book.genre}
                            </Badge>
                            <div className="flex items-center text-deep-navy/70">
                                <Star className="h-4 w-4 fill-faded-blue text-faded-blue mr-1" />
                                <span>{book.rating}/5</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                            <div className="flex items-center gap-2 text-deep-navy/70">
                                <User className="h-4 w-4 text-faded-blue" />
                                <span>{book.author}</span>
                            </div>
                            <div className="flex items-center gap-2 text-deep-navy/70">
                                <Calendar className="h-4 w-4 text-faded-blue" />
                                <span>{book.publishDate}</span>
                            </div>
                            <div className="flex items-center gap-2 text-deep-navy/70">
                                <BookOpen className="h-4 w-4 text-faded-blue" />
                                <span>{book.pages} pages</span>
                            </div>
                        </div>

                        <Separator className="my-6" />

                        <div>
                            <h3 className="text-xl font-semibold text-deep-navy mb-4">
                                Summary
                            </h3>
                            <p className="text-deep-navy/80 mb-6">
                                {book.summary}
                            </p>

                            <h3 className="text-xl font-semibold text-deep-navy mb-4">
                                About This Book
                            </h3>
                            <p className="text-deep-navy/80 whitespace-pre-line">
                                {book.longDescription}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
