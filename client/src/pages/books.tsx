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
import books from "../data/books.json";

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
