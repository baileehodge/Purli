import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertWaitlistSchema } from "@shared/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
    BookCopy,
    Users,
    ArrowRight,
    Pencil,
    Heart,
    Book,
    ScrollText,
    School,
    FileEdit,
    Mail
} from "lucide-react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "@/components/ui/carousel";
import { Link } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";

// Sample book data
const featuredBooks = [
    {
        id: 1,
        title: "The Silent Echo",
        author: "Elizabeth Morgan",
        cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=687&auto=format&fit=crop",
        summary:
            "A gripping tale of mystery and redemption set in a small coastal town.",
        genre: "Mystery"
    },
    {
        id: 2,
        title: "Beyond the Horizon",
        author: "James Patterson",
        cover: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=687&auto=format&fit=crop",
        summary:
            "An epic adventure across continents in search of ancient wisdom.",
        genre: "Adventure"
    },
    {
        id: 3,
        title: "Whispers in the Wind",
        author: "Sarah Johnson",
        cover: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=688&auto=format&fit=crop",
        summary: "A heartwarming story of love and loss in rural America.",
        genre: "Romance"
    },
    {
        id: 4,
        title: "The Last Guardian",
        author: "Michael Chen",
        cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=687&auto=format&fit=crop",
        summary:
            "In a world where magic is fading, one guardian stands between order and chaos.",
        genre: "Fantasy"
    },
    {
        id: 5,
        title: "Echoes of Tomorrow",
        author: "Amara Wilson",
        cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=687&auto=format&fit=crop",
        summary:
            "A thought-provoking journey through possible futures and parallel realities.",
        genre: "Science Fiction"
    },
    {
        id: 6,
        title: "The Hidden Truth",
        author: "Robert Davis",
        cover: "https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=1476&auto=format&fit=crop",
        summary:
            "A detective's relentless pursuit of justice uncovers secrets that threaten the entire city.",
        genre: "Thriller"
    },
    {
        id: 7,
        title: "Seasons of Change",
        author: "Emily Zhang",
        cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=687&auto=format&fit=crop",
        summary:
            "Four friends navigate life's challenges through different seasons of their lives.",
        genre: "Contemporary Fiction"
    },
    {
        id: 8,
        title: "Mountain's Echo",
        author: "Daniel Torres",
        cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1374&auto=format&fit=crop",
        summary:
            "A survival story set in the unforgiving wilderness of the Rocky Mountains.",
        genre: "Adventure"
    },
    {
        id: 9,
        title: "The Forgotten Path",
        author: "Olivia Parker",
        cover: "https://images.unsplash.com/photo-1629992101753-56d196c8aabb?q=80&w=690&auto=format&fit=crop",
        summary:
            "An archaeological discovery leads to an ancient mystery with modern implications.",
        genre: "Historical Fiction"
    },
    {
        id: 10,
        title: "Starlight Dreams",
        author: "Nathan Williams",
        cover: "https://images.unsplash.com/photo-1518744386442-2d48ac47a7eb?q=80&w=1374&auto=format&fit=crop",
        summary:
            "A young astronomer's journey to prove her revolutionary theory about the cosmos.",
        genre: "Science Fiction"
    }
];

export default function Home() {
    const { toast } = useToast();
    const [searchParams] = useSearchParams();
    const source = searchParams.get("src") || "Website";

    const form = useForm({
        resolver: zodResolver(insertWaitlistSchema),
        defaultValues: {
            email: "",
            fullName: "",
            Hp: "",
            source: source
        }
    });

    const authorForm = useForm({
        resolver: zodResolver(insertWaitlistSchema),
        defaultValues: {
            email: "",
            fullName: "",
            Hp: "",
            source: "Author Contact"
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
            authorForm.reset();
        },
        onError: (error: Error) => {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive"
            });
        }
    });

    return (
        <div className="min-h-screen bg-off-white">
            {/* Author CTA Button - Now positioned absolutely in the top right */}
            <div className="absolute top-4 right-4 z-10">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button
                            variant="outline"
                            className="bg-faded-blue text-deep-navy hover:bg-soft-clay hover:text-white"
                        >
                            <Pencil className="mr-2 h-4 w-4" />
                            Are you an Author?
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold text-deep-navy">
                                Want to reach more readers?
                            </DialogTitle>
                            <DialogDescription className="text-deep-navy/80 pt-4">
                                Partner with Purli to create clean versions of
                                your books and tap into a growing market of
                                readers who prefer content without explicit
                                material.
                                <ul className="mt-4 space-y-2">
                                    <li className="flex items-center gap-2">
                                        <Users className="h-4 w-4 text-faded-blue" />
                                        Expand your readership
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Heart className="h-4 w-4 text-faded-blue" />
                                        Generate additional revenue
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Book className="h-4 w-4 text-faded-blue" />
                                        Maintain story integrity
                                    </li>
                                </ul>
                            </DialogDescription>
                        </DialogHeader>
                        <Form {...authorForm}>
                            <form
                                onSubmit={authorForm.handleSubmit((data) =>
                                    joinWaitlist.mutate(data)
                                )}
                                className="space-y-4 mt-4"
                            >
                                <FormField
                                    control={authorForm.control}
                                    name="fullName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    placeholder="Your Name"
                                                    {...field}
                                                    className="border-soft-gray focus:border-faded-blue"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={authorForm.control}
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
                                    control={authorForm.control}
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
                                    type="submit"
                                    className="w-full bg-faded-blue hover:bg-soft-clay text-deep-navy hover:text-white font-medium"
                                    disabled={joinWaitlist.isPending}
                                >
                                    <Mail className="mr-2 h-4 w-4" />
                                    {joinWaitlist.isPending
                                        ? "Sending..."
                                        : "Contact Us"}
                                </Button>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Hero Section */}
            <div className="container mx-auto px-4 py-16 md:py-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl md:text-6xl font-bold mb-2 text-deep-navy">
                        Read More. Worry Less.
                    </h1>
                    <h2 className="text-2xl md:text-2xl italic mb-6 text-deep-navy">
                        Find clean versions of your favorite books
                    </h2>
                    <p className="text-xl text-deep-navy/80 max-w-2xl mx-auto">
                        Now, you can read without worry and share books with
                        confidence. Purli offers clean versions of your favorite
                        books, removing profanity and explicit scenes while
                        keeping the story intact.
                    </p>
                </motion.div>

                {/* Waitlist Form */}
                <Card className="max-w-md mx-auto bg-white border-soft-gray">
                    <CardContent className="pt-6">
                        <p className="text-center mb-4 text-deep-navy/70">
                            Be the first to access Purli's collection of clean
                            books. Sign up now and get notified at launch!
                        </p>
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
                    </CardContent>
                </Card>

                {/* Stats */}
                <div className="mt-8 text-center text-deep-navy/70">
                    <div className="flex items-center justify-center gap-2">
                        <span></span>
                    </div>
                </div>
            </div>

            {/* Featured Books Carousel */}
            <div className="my-12">
                <h2 className="text-3xl font-bold text-center mb-8 text-deep-navy">
                    Featured Books
                </h2>
                <Carousel className="w-full max-w-5xl mx-auto">
                    <CarouselContent>
                        {featuredBooks.map((book) => (
                            <CarouselItem
                                key={book.id}
                                className="md:basis-1/3 lg:basis-1/4"
                            >
                                <Link to={`/book/${book.id}`}>
                                    <div className="p-1">
                                        <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                            <CardContent className="p-0">
                                                <AspectRatio
                                                    ratio={2 / 3}
                                                    className="bg-muted"
                                                >
                                                    <img
                                                        src={book.cover}
                                                        alt={book.title}
                                                        className="object-cover w-full h-full"
                                                    />
                                                </AspectRatio>
                                                <div className="p-4">
                                                    <h3 className="font-semibold text-deep-navy truncate">
                                                        {book.title}
                                                    </h3>
                                                    <p className="text-sm text-deep-navy/70">
                                                        {book.author}
                                                    </p>
                                                    <div className="mt-2">
                                                        <span className="inline-block px-2 py-1 text-xs bg-faded-blue/20 text-deep-navy rounded-full">
                                                            {book.genre}
                                                        </span>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </Link>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-0" />
                    <CarouselNext className="right-0" />
                </Carousel>
                <div className="text-center mt-6">
                    <Button
                        variant="outline"
                        className="bg-faded-blue hover:bg-soft-clay text-deep-navy font-medium"
                        asChild
                    >
                        <Link to="/books">View All Books</Link>
                    </Button>
                </div>
            </div>

            {/* How it Works */}
            <div className="bg-warm-beige/10 py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12 text-deep-navy">
                        How It Works
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8 relative">
                        {howItWorks.map((step, i) => (
                            <motion.div
                                key={step.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="relative"
                            >
                                <div className="p-6 rounded-lg bg-white border border-soft-gray h-full">
                                    <div className="flex items-center justify-center mb-6">
                                        <div className="p-3 rounded-full bg-faded-blue/10">
                                            <step.icon className="h-8 w-8 text-faded-blue" />
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2 text-deep-navy text-center">
                                        {step.title}
                                    </h3>
                                    <p className="text-deep-navy/70 text-center">
                                        {step.description}
                                    </p>
                                </div>
                                {i < howItWorks.length - 1 && (
                                    <div className="hidden md:flex absolute inset-y-0 right-[-2rem] z-10 items-center justify-center w-8">
                                        <ArrowRight className="h-6 w-6 text-soft-clay" />
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Value Proposition */}
            <div className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12 text-deep-navy">
                        Why Choose Purli?
                    </h2>
                    <p className="text-center text-deep-navy/80 max-w-2xl mx-auto mb-12">
                        Purli ensures that every book keeps its essence while
                        making it accessible to those who prefer clean reading.
                    </p>
                    <div className="grid md:grid-cols-3 gap-8">
                        {valueProps.map((prop, i) => (
                            <motion.div
                                key={prop.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="p-6 rounded-lg bg-white border border-soft-gray"
                            >
                                <div className="flex flex-col items-center gap-4 mb-4">
                                    <div className="p-3 rounded-full bg-faded-blue/10">
                                        <prop.icon className="h-6 w-6 text-faded-blue" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-deep-navy text-center">
                                        {prop.title}
                                    </h3>
                                </div>
                                <p className="text-deep-navy/70 text-center">
                                    {prop.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-warm-beige/10 py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12 text-deep-navy">
                        Frequently Asked Questions
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {faqs.map((faq, i) => (
                            <motion.div
                                key={faq.question}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="p-6 rounded-lg bg-white border border-soft-gray"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="mt-1">
                                        <ScrollText className="h-5 w-5 text-faded-blue" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2 text-deep-navy">
                                            {faq.question}
                                        </h3>
                                        <p className="text-deep-navy/70">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="py-8 bg-deep-navy text-white">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-white/70">
                            © 2025 Purli. All rights reserved.
                        </p>
                        <div className="flex items-center gap-4">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-white hover:text-faded-blue"
                            >
                                Privacy Policy
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-white hover:text-faded-blue"
                            >
                                Terms of Use
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-white hover:text-faded-blue"
                            >
                                Contact Us
                            </Button>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

const howItWorks = [
    {
        icon: BookCopy,
        title: "Authors Approve Clean Versions",
        description:
            "We partner with authors and publishers to create an approved, refined version of their books."
    },
    {
        icon: FileEdit,
        title: "Expert Editing Process",
        description:
            "Our human editors carefully remove profanity and explicit content while maintaining the story's integrity."
    },
    {
        icon: Book,
        title: "Read with Confidence",
        description: "Browse and purchase clean books directly from Purli."
    }
];

const valueProps = [
    {
        icon: Heart,
        title: "For Readers",
        description: "Enjoy your favorite books without uncomfortable content."
    },
    {
        icon: Pencil,
        title: "For Authors",
        description: "Reach a wider audience and generate additional revenue."
    },
    {
        icon: School,
        title: "For Parents & Schools",
        description: "Provide books that are safe for all audiences."
    }
];

const faqs = [
    {
        question: "Who is Purli for?",
        answer: "Anyone who wants to enjoy great stories without explicit content, including parents, schools, and readers who prefer clean versions."
    },
    {
        question: "How do you edit books without ruining the story?",
        answer: "We use expert human editors to ensure the narrative remains smooth and unchanged, only refining specific content."
    },
    {
        question: "Do authors still make money?",
        answer: "Yes! Authors receive a percentage of every sale, creating an additional revenue stream."
    },
    {
        question: "Is this censorship?",
        answer: "Not at all! Purli is about choice, giving readers the option to enjoy books in a way that suits them best."
    }
];
