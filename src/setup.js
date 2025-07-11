const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Post = require("./models/PostsModel");
const User = require("./models/UserModel");
const { hashPassword } = require("./hashingFunctions/hash");

dotenv.config({ path: "./src/.env" });
const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1); // Exit process with failure
  }
};

dbConnect();

const dummyData = [
  {
    post_id: "post001",
    title: "Understanding JavaScript Closures",
    contentSnippet:
      "Closures let you retain access to an outer function’s scope from an inner function.",
  },
  {
    post_id: "post002",
    title: "A Guide to RESTful APIs",
    contentSnippet:
      "REST APIs follow stateless, client-server architecture for scalable web services.",
  },
  {
    post_id: "post003",
    title: "What is Event Loop in Node.js?",
    contentSnippet:
      "The event loop handles asynchronous callbacks in Node.js efficiently.",
  },
  {
    post_id: "post004",
    title: "CSS Grid vs Flexbox",
    contentSnippet:
      "Both are powerful layout tools, but serve different use cases in responsive design.",
  },
  {
    post_id: "post005",
    title: "MongoDB Aggregation Pipeline",
    contentSnippet:
      "Aggregation pipelines allow advanced data processing and transformation in MongoDB.",
  },
  {
    post_id: "post006",
    title: "Async/Await Explained",
    contentSnippet:
      "Async/await simplifies asynchronous code, making it easier to read and debug.",
  },
  {
    post_id: "post007",
    title: "Deploying with Vercel",
    contentSnippet:
      "Vercel offers zero-config deployment for frontend frameworks like Next.js.",
  },
  {
    post_id: "post008",
    title: "JWT vs Session Authentication",
    contentSnippet:
      "JWTs are stateless and scalable, while sessions rely on server-side storage.",
  },
  {
    post_id: "post009",
    title: "Top 10 VS Code Extensions",
    contentSnippet:
      "Extensions like Prettier, ESLint, and GitLens improve your coding workflow.",
  },
  {
    post_id: "post010",
    title: "Docker Basics for Beginners",
    contentSnippet:
      "Docker helps containerize applications, making them portable and consistent.",
  },
  {
    post_id: "post011",
    title: "Understanding Prototypes in JS",
    contentSnippet:
      "Prototypes enable inheritance and method sharing between JavaScript objects.",
  },
  {
    post_id: "post012",
    title: "HTTP Status Codes Explained",
    contentSnippet:
      "From 200 OK to 500 Internal Server Error, each code tells a story.",
  },
  {
    post_id: "post013",
    title: "Using Git Like a Pro",
    contentSnippet:
      "Mastering git commands like rebase, stash, and cherry-pick boosts productivity.",
  },
  {
    post_id: "post014",
    title: "React Hooks Deep Dive",
    contentSnippet:
      "Hooks like useState and useEffect bring state and side effects to functional components.",
  },
  {
    post_id: "post015",
    title: "Scaling Node.js Applications",
    contentSnippet:
      "Cluster module and load balancers help scale Node.js apps for heavy traffic.",
  },
  {
    post_id: "post016",
    title: "CSS Variables for Theming",
    contentSnippet:
      "CSS variables make theming flexible and dynamic without touching JS.",
  },
  {
    post_id: "post017",
    title: "Intro to TypeScript",
    contentSnippet:
      "TypeScript brings static typing to JavaScript for better code quality and tooling.",
  },
  {
    post_id: "post018",
    title: "Building a Blog with Express and MongoDB",
    contentSnippet:
      "Use Express for routing and MongoDB for data persistence to create a blog backend.",
  },
  {
    post_id: "post019",
    title: "Understanding CSRF and How to Prevent It",
    contentSnippet:
      "CSRF attacks trick users into executing actions, but can be prevented with tokens.",
  },
  {
    post_id: "post020",
    title: "WebSockets vs HTTP Polling",
    contentSnippet:
      "WebSockets provide full-duplex communication, ideal for real-time apps.",
  },
];

const seedDummyData = async () => {
  try {
    await Post.deleteMany({});
    await Post.insertMany(dummyData);
    console.log("Dummy data seeded successfully");
  } catch (error) {
    console.error("Error seeding dummy data:", error.message);
  }
};

const createDummyUser = async () => {
  try {
    await User.deleteMany({});
    const hashedPassword = await hashPassword("12345678");
    await User.create({
      name: "Dummy User",
      email: "dummy@example.com",
      password: hashedPassword,
    });
    console.log("Dummy user created successfully\n");
    console.log("Dummy user credentials:");
    console.log("Email: dummy@example.com")
    console.log("Password: 12345678")
  } catch (error) {
    console.error("Error creating dummy user:", error.message);
  }
};

const runSeeder = async () => {
    try {
      await seedDummyData();
      await createDummyUser();
    } catch (error) {
      console.error("Seeder error:", error.message);
    } finally {
      mongoose.connection.close();
      console.log("Database connection closed");
    }
  };
  
  runSeeder();