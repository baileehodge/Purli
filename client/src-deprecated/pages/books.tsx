import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Search, Filter } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

// Sample book data - same as in book-detail.tsx
const books = [
    {
        id: 1,
        title: "The Silent Echo",
        author: "Elizabeth Morgan",
        cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=687&auto=format&fit=crop",
        summary:
            "A gripping tale of mystery and redemption set in a small coastal town.",
        genre: "Mystery",
        publishDate: "June 15, 2023",
        pages: 342,
        rating: 4.5
    },
    {
        id: 2,
        title: "Beyond the Horizon",
        author: "James Patterson",
        cover: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=687&auto=format&fit=crop",
        summary:
            "An epic adventure across continents in search of ancient wisdom.",
        genre: "Adventure",
        publishDate: "March 3, 2024",
        pages: 412,
        rating: 4.7
    },
    {
        id: 3,
        title: "Whispers in the Wind",
        author: "Sarah Johnson",
        cover: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=688&auto=format&fit=crop",
        summary: "A heartwarming story of love and loss in rural America.",
        genre: "Romance",
        publishDate: "September 12, 2023",
        pages: 298,
        rating: 4.3
    },
    {
        id: 4,
        title: "The Last Guardian",
        author: "Michael Chen",
        cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=687&auto=format&fit=crop",
        summary:
            "In a world where magic is fading, one guardian stands between order and chaos.",
        genre: "Fantasy",
        publishDate: "January 20, 2024",
        pages: 486,
        rating: 4.8
    },
    {
        id: 5,
        title: "Echoes of Tomorrow",
        author: "Amara Wilson",
        cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=687&auto=format&fit=crop",
        summary:
            "A thought-provoking journey through possible futures and parallel realities.",
        genre: "Science Fiction",
        publishDate: "November 5, 2023",
        pages: 372,
        rating: 4.6
    },
    {
        id: 6,
        title: "The Hidden Truth",
        author: "Robert Davis",
        cover: "https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=1476&auto=format&fit=crop",
        summary:
            "A detective's relentless pursuit of justice uncovers secrets that threaten the entire city.",
        genre: "Thriller",
        publishDate: "August 8, 2023",
        pages: 356,
        rating: 4.4
    },
    {
        id: 7,
        title: "Seasons of Change",
        author: "Emily Zhang",
        cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=687&auto=format&fit=crop",
        summary:
            "Four friends navigate life's challenges through different seasons of their lives.",
        genre: "Contemporary Fiction",
        publishDate: "April 18, 2023",
        pages: 324,
        rating: 4.2
    },
    {
        id: 8,
        title: "Mountain's Echo",
        author: "Daniel Torres",
        cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1374&auto=format&fit=crop",
        summary:
            "A survival story set in the unforgiving wilderness of the Rocky Mountains.",
        genre: "Adventure",
        publishDate: "February 2, 2024",
        pages: 368,
        rating: 4.7
    },
    {
        id: 9,
        title: "The Forgotten Path",
        author: "Olivia Parker",
        cover: "https://images.unsplash.com/photo-1629992101753-56d196c8aabb?q=80&w=690&auto=format&fit=crop",
        summary:
            "An archaeological discovery leads to an ancient mystery with modern implications.",
        genre: "Historical Fiction",
        publishDate: "October 10, 2023",
        pages: 402,
        rating: 4.5
    },
    {
        id: 10,
        title: "Starlight Dreams",
        author: "Nathan Williams",
        cover: "https://images.unsplash.com/photo-1518744386442-2d48ac47a7eb?q=80&w=1374&auto=format&fit=crop",
        summary:
            "A young astronomer's journey to prove her revolutionary theory about the cosmos.",
        genre: "Science Fiction",
        publishDate: "July 7, 2023",
        pages: 336,
        rating: 4.6
    }
];

// Get unique genres for filter
const genres = [...new Set(books.map((book) => book.genre))];

export default function Books() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("");
    const [sortBy, setSortBy] = useState("title");

    // Filter books based on search term and genre
    const filteredBooks = books.filter((book) => {
        const matchesSearch =
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesGenre =
            selectedGenre === "" || book.genre === selectedGenre;
        return matchesSearch && matchesGenre;
    });

    // Sort books based on selected sort option
    const sortedBooks = [...filteredBooks].sort((a, b) => {
        if (sortBy === "title") {
            return a.title.localeCompare(b.title);
        } else if (sortBy === "author") {
            return a.author.localeCompare(b.author);
        } else if (sortBy === "rating") {
            return b.rating - a.rating;
        } else if (sortBy === "newest") {
            return (
                new Date(b.publishDate).getTime() -
                new Date(a.publishDate).getTime()
            );
        }
        return 0;
    });

    return (
        <div className="min-h-screen bg-off-white py-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-deep-navy mb-4">
                        Our Book Collection
                    </h1>
                    <p className="text-deep-navy/70 max-w-2xl mx-auto">
                        Browse our collection of clean, family-friendly books.
                        Each book has been carefully edited to maintain the
                        story's integrity while removing explicit content.
                    </p>
                </div>

                {/* Search and Filter */}
                <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                    <div className="grid md:grid-cols-4 gap-4">
                        <div className="md:col-span-2">
                            <div className="relative">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-deep-navy/50" />
                                <Input
                                    placeholder="Search by title or author..."
                                    className="pl-10 border-soft-gray"
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <div>
                            <Select
                                value={selectedGenre}
                                onValueChange={setSelectedGenre}
                            >
                                <SelectTrigger className="border-soft-gray">
                                    <SelectValue placeholder="Filter by genre" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Genres</SelectItem>
                                    {genres.map((genre) => (
                                        <SelectItem key={genre} value={genre}>
                                            {genre}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger className="border-soft-gray">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="title">
                                        Title (A-Z)
                                    </SelectItem>
                                    <SelectItem value="author">
                                        Author (A-Z)
                                    </SelectItem>
                                    <SelectItem value="rating">
                                        Highest Rated
                                    </SelectItem>
                                    <SelectItem value="newest">
                                        Newest First
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                {/* Book Grid */}
                {sortedBooks.length > 0 ? (
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {sortedBooks.map((book) => (
                            <Link to={`/book/${book.id}`} key={book.id}>
                                <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300">
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
                                            <p className="text-sm text-deep-navy/70 mb-2">
                                                {book.author}
                                            </p>
                                            <Badge className="bg-faded-blue/20 text-deep-navy hover:bg-faded-blue/30">
                                                {book.genre}
                                            </Badge>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <h3 className="text-xl font-semibold text-deep-navy mb-2">
                            No books found
                        </h3>
                        <p className="text-deep-navy/70">
                            Try adjusting your search or filter criteria
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
