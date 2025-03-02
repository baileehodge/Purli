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

// Sample book data - in a real app, this would come from an API
const books = [
  {
    id: 1,
    title: "The Silent Echo",
    author: "Elizabeth Morgan",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=687&auto=format&fit=crop",
    summary: "A gripping tale of mystery and redemption set in a small coastal town. When journalist Maya Reynolds returns to her hometown after fifteen years, she's confronted with the unsolved disappearance that drove her away. As she investigates, she uncovers secrets that powerful people want to keep hidden. The Silent Echo explores themes of truth, justice, and the price of silence in communities bound by tradition.",
    genre: "Mystery",
    publishDate: "June 15, 2023",
    pages: 342,
    rating: 4.5,
    longDescription: "In the sleepy coastal town of Harbor Bay, the disappearance of a local teenager fifteen years ago left a wound that never healed. Maya Reynolds, once the best friend of the missing girl, fled the whispers and accusations, building a successful career as an investigative journalist in the city.\n\nWhen a family emergency forces Maya to return, she finds Harbor Bay unchanged on the surface but simmering with unresolved tensions. The new mayor is planning a major development project that would transform the town, but as Maya begins asking questions, she discovers connections between the development, the old case, and several prominent families.\n\nWith the help of the police chief's son—now a detective himself—Maya navigates small-town politics and long-buried secrets. As threatening notes appear at her door and anonymous calls warn her to stop digging, Maya realizes that uncovering the truth might put her in the same danger that her friend faced years ago.\n\nThe Silent Echo is a masterfully crafted mystery that examines how the past echoes into the present, and how one person's courage can break the cycle of silence that protects the guilty."
  },
  {
    id: 2,
    title: "Beyond the Horizon",
    author: "James Patterson",
    cover: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=687&auto=format&fit=crop",
    summary: "An epic adventure across continents in search of ancient wisdom.",
    genre: "Adventure",
    publishDate: "March 3, 2024",
    pages: 412,
    rating: 4.7,
    longDescription: "Professor Thomas Clarke has spent his career studying ancient civilizations, but his theories about a lost global network of knowledge have made him an outcast in academic circles. When a mysterious artifact arrives at his office—sent by a former student who has gone missing in the mountains of Nepal—Thomas finds himself drawn into a dangerous quest.\n\nThe artifact contains clues to the location of a hidden library said to contain the collected wisdom of a civilization that predates recorded history. As Thomas follows the trail across five continents, he's pursued by a shadowy organization that will stop at nothing to claim the discovery for themselves.\n\nJoined by his former student's sister, an archaeologist with her own theories about ancient connections, Thomas races against time and rivals. From the bustling markets of Marrakech to the frozen Himalayan peaks, from underwater ruins in the Mediterranean to hidden caves in the Australian outback, their journey reveals that history as we know it may be merely a shadow of the truth.\n\nBeyond the Horizon combines breathtaking adventure with profound questions about humanity's forgotten past and the knowledge that could shape our future."
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
    rating: 4.3,
    longDescription: "After her grandmother's passing, Ellie Sullivan inherits the family farm in rural Nebraska—a place she left behind fifteen years ago, along with her high school sweetheart, Jack Thornton. Returning to settle the estate, Ellie plans a quick visit to sell the property and return to her busy life as a Chicago architect.\n\nBut the farm holds both memories and surprises. Among her grandmother's belongings, Ellie discovers a collection of letters revealing a family secret that changes everything she thought she knew about her roots. Meanwhile, Jack—now a widowed father running the neighboring farm—is still part of the tight-knit community Ellie left behind.\n\nAs spring planting season arrives, Ellie extends her stay, drawn both to the rhythm of farm life and to Jack, whose daughter needs a maternal figure. When a developer shows interest in buying both their properties for a price that could secure their futures, Ellie and Jack must decide what truly matters—the security of wealth or the richness of a life deeply connected to the land and each other.\n\nWhispers in the Wind is a tender exploration of second chances, the meaning of home, and the courage it takes to listen to the whispers of your heart."
  },
  {
    id: 4,
    title: "The Last Guardian",
    author: "Michael Chen",
    cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=687&auto=format&fit=crop",
    summary: "In a world where magic is fading, one guardian stands between order and chaos.",
    genre: "Fantasy",
    publishDate: "January 20, 2024",
    pages: 486,
    rating: 4.8,
    longDescription: "For centuries, the Guardians have maintained the Balance, preventing the forces of chaos from overwhelming the mortal realm. But now their numbers have dwindled to one: Kira Nightshade, a reluctant heir to an ancient responsibility she never wanted.\n\nAs the last of her kind, Kira guards the final Wellspring of magic in the known world. When the Wellspring begins to fail, creatures long banished start slipping through weakening barriers, and Kira must find a way to restore the Balance before it's too late.\n\nHer quest leads her to seek out the descendants of the original Guardians—ordinary people unaware of their heritage or potential. Among them is Elian, a scholar with hidden talents; Nessa, a blacksmith's daughter with an affinity for fire; and Rowan, a prince whose kingdom stands in the path of the encroaching darkness.\n\nAs Kira gathers these unlikely allies, she's pursued by the Void Caller, a sorcerer who believes that true power can only be achieved by embracing chaos. The Void Caller was once a Guardian himself, before ambition corrupted him, and he knows secrets about Kira's past that could unravel her resolve.\n\nThe Last Guardian weaves a tale of duty and destiny, exploring what it means to stand against overwhelming odds when the cost of failure is unthinkable."
  },
  {
    id: 5,
    title: "Echoes of Tomorrow",
    author: "Amara Wilson",
    cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=687&auto=format&fit=crop",
    summary: "A thought-provoking journey through possible futures and parallel realities.",
    genre: "Science Fiction",
    publishDate: "November 5, 2023",
    pages: 372,
    rating: 4.6,
    longDescription: "Dr. Eliza Chen has dedicated her career to developing technology that can predict probable futures based on present choices. When her laboratory creates a breakthrough—a device that can actually glimpse alternate timelines—the implications are staggering. But before the discovery can be properly studied, the technology is stolen.\n\nEliza finds herself recruited by a secretive government agency that has tracked the theft to a fringe group called the Divergents. This group believes that humanity is trapped in the wrong timeline—one headed for catastrophe—and they're determined to use Eliza's technology to correct history, regardless of the consequences.\n\nAs Eliza infiltrates the group to recover her work, she encounters Marcus, a physicist whose theories formed the foundation of her research. Once her mentor and almost something more, Marcus now leads the Divergents with an almost religious fervor. He shows Eliza glimpses of alternate realities: some utopian, some horrific, all fascinating.\n\nCaught between government agents who want to control her technology and idealists willing to kill for it, Eliza must determine for herself: Is there a right timeline to fight for? And if we could see all possible futures, would we still have the courage to choose one?\n\nEchoes of Tomorrow combines cutting-edge science fiction concepts with profound philosophical questions about fate, free will, and the responsibility that comes with knowledge."
  },
  {
    id: 6,
    title: "The Hidden Truth",
    author: "Robert Davis",
    cover: "https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=1476&auto=format&fit=crop",
    summary: "A detective's relentless pursuit of justice uncovers secrets that threaten the entire city.",
    genre: "Thriller",
    publishDate: "August 8, 2023",
    pages: 356,
    rating: 4.4,
    longDescription: "Detective Mira Santos has built her career on solving the cases everyone else gives up on. But when she's assigned to investigate the apparent suicide of a prominent judge, even she doesn't expect to uncover a conspiracy that reaches into the highest levels of Westport City's government and business elite.\n\nThe judge's death connects to a series of other suspicious suicides among powerful figures in the city. Each victim was facing personal or professional ruin before their death, making suicide plausible. But Mira finds a pattern—each had recently changed their position on a massive redevelopment project that would transform the city's waterfront.\n\nAs Mira digs deeper, she finds herself working alongside an unlikely ally: investigative journalist Dominic Wells, whose own research into corporate corruption overlaps with her case. Their partnership is complicated by their history—Dominic's reporting once compromised one of Mira's cases—and by the attraction neither wants to acknowledge.\n\nWith pressure mounting from her superiors to close the case and shadowy threats appearing at every turn, Mira must determine who she can trust. The Hidden Truth is a taut thriller that examines the price of justice in a world where power and money often dictate the narrative."
  },
  {
    id: 7,
    title: "Seasons of Change",
    author: "Emily Zhang",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=687&auto=format&fit=crop",
    summary: "Four friends navigate life's challenges through different seasons of their lives.",
    genre: "Contemporary Fiction",
    publishDate: "April 18, 2023",
    pages: 324,
    rating: 4.2,
    longDescription: "Mei, Sasha, Dahlia, and Zoe have been friends since their first day of college, when chance assigned them as roommates. Now, fifteen years later, their lives have taken different paths, but they've maintained their tradition of gathering once a year at a lakeside cabin to reconnect.\n\nThis year's reunion comes at a pivotal moment for each woman: Mei, always the achiever, questions her corporate success as she faces fertility struggles; Sasha's marriage is crumbling under secrets she's afraid to share; Dahlia, a single mother and artist, has received an offer that could change her career but would uproot her carefully constructed life; and Zoe, after years of wandering, has returned from abroad with a fiancé none of her friends have met and a sense of purpose they don't quite trust.\n\nOver the course of a week in autumn, as the woods around them transform with the season, long-held resentments and unspoken truths emerge. A discovery on the property—an abandoned journal from the 1970s—mirrors their own complicated friendships and leads them to reconsider the narratives they've built their lives around.\n\nSeasons of Change is a lyrical exploration of female friendship, the expectations women place on themselves and each other, and the possibility of reinvention at any age."
  },
  {
    id: 8,
    title: "Mountain's Echo",
    author: "Daniel Torres",
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1374&auto=format&fit=crop",
    summary: "A survival story set in the unforgiving wilderness of the Rocky Mountains.",
    genre: "Adventure",
    publishDate: "February 2, 2024",
    pages: 368,
    rating: 4.7,
    longDescription: "When renowned wildlife photographer Lucas Blackwood embarks on a solo expedition to capture images of elusive mountain lions in the remote Rockies, he's seeking both professional success and personal escape from a life that's falling apart. What begins as a two-week assignment becomes a fight for survival when an early blizzard strands him miles from civilization.\n\nInjured in a fall and with limited supplies, Lucas must draw on his knowledge of the wilderness and his own resilience to find his way back. As days turn into weeks, the mountains become both his prison and his salvation. He encounters a wounded wolf that becomes an unlikely companion, forcing Lucas to consider the complex relationship between humans and the natural world.\n\nMeanwhile, in the nearest town, search efforts are complicated by politics and budget constraints. The only person who refuses to give up is Ranger Elena Valdez, who feels responsible for approving Lucas's permit despite storm warnings. Against orders, she continues searching even as others declare the photographer a lost cause.\n\nAlternating between Lucas's struggle in the wilderness and the search efforts in civilization, Mountain's Echo explores themes of human endurance, our place in the natural world, and what it truly means to be found."
  },
  {
    id: 9,
    title: "The Forgotten Path",
    author: "Olivia Parker",
    cover: "https://images.unsplash.com/photo-1629992101753-56d196c8aabb?q=80&w=690&auto=format&fit=crop",
    summary: "An archaeological discovery leads to an ancient mystery with modern implications.",
    genre: "Historical Fiction",
    publishDate: "October 10, 2023",
    pages: 402,
    rating: 4.5,
    longDescription: "Dr. Isabelle Foster's career as an archaeologist has been defined by caution and methodical research. But when construction workers in London uncover a previously unknown Roman temple beneath the city, Isabelle throws caution aside to secure access to the site before it's destroyed by development.\n\nThe temple doesn't match any known Roman design, and the artifacts inside suggest a fusion of Roman and Celtic practices that shouldn't exist. Most intriguing is a partial map that hints at a hidden pilgrimage route across Roman Britain—one that doesn't appear in any historical record.\n\nPartnering with Marcus Blackwood, a historian with unorthodox theories about cultural exchange in ancient Britain, Isabelle follows the clues from London to the Scottish Highlands. Their journey traces the steps of a Roman woman named Lucia, whose story emerges through artifacts they discover along the route.\n\nAs Isabelle and Marcus uncover more about Lucia's journey and the apparent alliance between supposed enemies, they attract attention from nationalist groups who have their own reasons for wanting to control the narrative of Britain's past. The ancient and modern stories intertwine as Isabelle discovers that history is rarely as simple as conquerors and conquered—and that bringing the truth to light can be dangerous in any century."
  },
  {
    id: 10,
    title: "Starlight Dreams",
    author: "Nathan Williams",
    cover: "https://images.unsplash.com/photo-1518744386442-2d48ac47a7eb?q=80&w=1374&auto=format&fit=crop",
    summary: "A young astronomer's journey to prove her revolutionary theory about the cosmos.",
    genre: "Science Fiction",
    publishDate: "July 7, 2023",
    pages: 336,
    rating: 4.6,
    longDescription: "In 2082, humanity has established research bases throughout the solar system, but the stars remain out of reach. Dr. Aria Kim, a brilliant but overlooked astronomer, develops a controversial theory about manipulating cosmic strings—theoretical defects in space-time—to create shortcuts across vast interstellar distances.\n\nWhen her funding is cut and her research dismissed as fantasy by the scientific establishment, Aria takes a desperate gamble: she accepts backing from the enigmatic Prometheus Corporation to build a prototype device on Europa, Jupiter's ice-covered moon.\n\nOn Europa, Aria works with a small team of scientists and engineers who share her dream of reaching the stars. But as the project progresses, she discovers that Prometheus has motives beyond scientific advancement. The corporation's founder, reclusive billionaire Elias Prometheus, believes that humanity faces an extinction-level threat only interstellar travel can solve—and he's willing to risk catastrophic failure to achieve success.\n\nAs Aria's prototype nears completion, tensions rise between scientific caution and corporate pressure. When tests reveal unexpected properties of cosmic strings, Aria must decide whether to shut down the potentially dangerous project or push forward into the unknown. The decision is complicated by her growing feelings for the mission's security chief, who has his own secret connection to Prometheus.\n\nStarlight Dreams explores humanity's drive to explore, the politics of scientific advancement, and the unforeseen consequences of manipulating forces we don't fully understand."
  }
];

export default function BookDetail() {
  const { id } = useParams();
  const { toast } = useToast();
  const [downloading, setDownloading] = useState(false);
  
  // Find the book with the matching ID
  const book = books.find(b => b.id === Number(id));
  
  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-off-white">
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <h1 className="text-2xl font-bold text-deep-navy mb-4">Book Not Found</h1>
            <p className="text-deep-navy/70 mb-6">The book you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/">Return Home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  const handleDownload = () => {
    setDownloading(true);
    
    // Simulate download delay
    setTimeout(() => {
      setDownloading(false);
      toast({
        title: "Download Complete",
        description: `${book.title} has been downloaded successfully.`,
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
                <AspectRatio ratio={2/3}>
                  <img 
                    src={book.cover} 
                    alt={book.title}
                    className="object-cover w-full h-full"
                  />
                </AspectRatio>
              </CardContent>
            </Card>
            
            <div className="mt-6">
              <Button 
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
              </Button>
            </div>
          </div>
          
          {/* Book Details */}
          <div className="md:col-span-2">
            <h1 className="text-3xl md:text-4xl font-bold text-deep-navy mb-2">{book.title}</h1>
            <h2 className="text-xl text-deep-navy/80 mb-4">by {book.author}</h2>
            
            <div className="flex items-center gap-2 mb-6">
              <Badge className="bg-faded-blue text-deep-navy">{book.genre}</Badge>
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
              <h3 className="text-xl font-semibold text-deep-navy mb-4">Summary</h3>
              <p className="text-deep-navy/80 mb-6">{book.summary}</p>
              
              <h3 className="text-xl font-semibold text-deep-navy mb-4">About This Book</h3>
              <p className="text-deep-navy/80 whitespace-pre-line">{book.longDescription}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}