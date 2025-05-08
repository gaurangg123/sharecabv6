import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type FeedbackCategory = "experience" | "improvement" | "feature" | "safety" | "driver" | "other";

type Feedback = {
  id: number;
  user: {
    name: string;
    avatar: string;
    role: string;
  };
  category: FeedbackCategory;
  title: string;
  content: string;
  likes: number;
  comments: number;
  date: string;
  liked?: boolean;
};

type Comment = {
  id: number;
  user: {
    name: string;
    avatar: string;
    role: string;
  };
  content: string;
  date: string;
  isOfficial?: boolean;
};

export default function Community() {
  const [activeTab, setActiveTab] = useState<"discussions" | "feedback" | "announcements">("discussions");
  const [selectedCategory, setSelectedCategory] = useState<FeedbackCategory | "all">("all");
  const [feedbackForm, setFeedbackForm] = useState({
    title: "",
    category: "experience" as FeedbackCategory,
    content: ""
  });
  const [formOpen, setFormOpen] = useState(false);
  const [expandedPost, setExpandedPost] = useState<number | null>(null);
  
  // Mock data for community posts
  const feedbackPosts: Feedback[] = [
    {
      id: 1,
      user: {
        name: "Priya Sharma",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        role: "Verified Rider"
      },
      category: "experience",
      title: "Great carpooling experience in Bangalore",
      content: "I've been using ShareCab for my daily commute to work in Electronic City for the past month, and I'm really impressed with how smooth the experience has been. The drivers are punctual, the cars are clean, and I've saved so much on my commuting costs. Plus, I've met some interesting professionals during my rides!",
      likes: 24,
      comments: 5,
      date: "2 days ago"
    },
    {
      id: 2,
      user: {
        name: "Rahul Verma",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        role: "Driver Partner"
      },
      category: "improvement",
      title: "Suggestion for driver app navigation",
      content: "As a driver partner, I think the navigation in the app could be improved. Sometimes it doesn't account for traffic congestion during peak hours in Delhi. If there could be real-time traffic updates integrated with alternative route suggestions, it would make the driving experience much better and help maintain timely pickups.",
      likes: 18,
      comments: 7,
      date: "4 days ago"
    },
    {
      id: 3,
      user: {
        name: "Ananya Patel",
        avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        role: "Verified Rider"
      },
      category: "feature",
      title: "Can we have music preferences in rider profiles?",
      content: "I think it would be great if riders could specify their music preferences in their profiles. That way, when I share a ride, the driver would know if I prefer quiet, or what kind of music I enjoy. It would make the ride more personalized and comfortable for everyone.",
      likes: 32,
      comments: 12,
      date: "1 week ago"
    },
    {
      id: 4,
      user: {
        name: "Vikram Singh",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        role: "Driver Partner"
      },
      category: "safety",
      title: "Safety features for night rides",
      content: "As someone who often drives in the evening, I appreciate ShareCab's safety features. However, I'd like to suggest adding an SOS button for drivers as well, not just riders. Sometimes we pick up passengers from less familiar areas in Mumbai, and having that extra safety measure would be reassuring.",
      likes: 45,
      comments: 8,
      date: "1 week ago",
      liked: true
    }
  ];

  // Mock comments for expanded post
  const postComments: Comment[] = [
    {
      id: 1,
      user: {
        name: "Deepak Kumar",
        avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        role: "Verified Rider"
      },
      content: "I completely agree! The safety features are essential, especially for women travelers. I use ShareCab for my evening commutes from office in Gurgaon and the tracking feature gives me peace of mind.",
      date: "5 days ago"
    },
    {
      id: 2,
      user: {
        name: "ShareCab Team",
        avatar: "https://cdn-icons-png.flaticon.com/512/5968/5968350.png",
        role: "Official"
      },
      content: "Thank you for your feedback, Vikram! We're currently working on enhancing our safety features for both riders and drivers. The SOS feature for drivers is already in our roadmap and should be available in the next app update. We value your suggestion and commitment to safety.",
      date: "4 days ago",
      isOfficial: true
    },
    {
      id: 3,
      user: {
        name: "Neha Gupta",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        role: "Verified Rider"
      },
      content: "Would be great if the app could also integrate with emergency services for both drivers and riders. Some areas of the cities have poor network coverage too.",
      date: "3 days ago"
    }
  ];

  const handleCategoryChange = (category: FeedbackCategory | "all") => {
    setSelectedCategory(category);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFeedbackForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, we would submit the feedback to an API
    alert("Thank you for your feedback! Our team will review it shortly.");
    setFeedbackForm({
      title: "",
      category: "experience",
      content: ""
    });
    setFormOpen(false);
  };

  const toggleLike = (id: number) => {
    // In a real implementation, this would call an API
    console.log(`Toggled like for post ${id}`);
  };

  const toggleExpandPost = (id: number) => {
    setExpandedPost(expandedPost === id ? null : id);
  };
  
  const getCategoryLabel = (category: FeedbackCategory): string => {
    switch (category) {
      case "experience": return "Experience";
      case "improvement": return "Improvement";
      case "feature": return "Feature Request";
      case "safety": return "Safety";
      case "driver": return "Driver Feedback";
      case "other": return "Other";
    }
  };
  
  const getCategoryColor = (category: FeedbackCategory): string => {
    switch (category) {
      case "experience": return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "improvement": return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
      case "feature": return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      case "safety": return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      case "driver": return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";
      case "other": return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400";
    }
  };
  
  const filteredPosts = selectedCategory === "all" 
    ? feedbackPosts 
    : feedbackPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow pt-20">
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">ShareCab Community</h1>
              <p className="text-muted-foreground mb-8">
                Join the conversation, share your experiences, and help us improve ShareCab for everyone.
              </p>
              
              {/* Tab navigation */}
              <div className="flex mb-6 border-b overflow-x-auto no-scrollbar">
                <button
                  className={`px-4 py-2 font-medium whitespace-nowrap ${
                    activeTab === "discussions"
                      ? "text-primary border-b-2 border-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setActiveTab("discussions")}
                >
                  Community Discussions
                </button>
                <button
                  className={`px-4 py-2 font-medium whitespace-nowrap ${
                    activeTab === "feedback"
                      ? "text-primary border-b-2 border-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setActiveTab("feedback")}
                >
                  Feedback & Suggestions
                </button>
                <button
                  className={`px-4 py-2 font-medium whitespace-nowrap ${
                    activeTab === "announcements"
                      ? "text-primary border-b-2 border-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setActiveTab("announcements")}
                >
                  Announcements
                </button>
              </div>
              
              {/* Community content */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Sidebar */}
                <div className="lg:col-span-1">
                  {/* Category filters */}
                  <div className="bg-card rounded-lg shadow-sm p-4 mb-4">
                    <h3 className="font-medium mb-3">Filter by Category</h3>
                    <div className="space-y-2">
                      <button
                        className={`w-full text-left px-3 py-2 rounded-md transition ${
                          selectedCategory === "all" 
                            ? "bg-primary/10 text-primary" 
                            : "hover:bg-muted"
                        }`}
                        onClick={() => handleCategoryChange("all")}
                      >
                        All Topics
                      </button>
                      <button
                        className={`w-full text-left px-3 py-2 rounded-md transition ${
                          selectedCategory === "experience" 
                            ? "bg-primary/10 text-primary" 
                            : "hover:bg-muted"
                        }`}
                        onClick={() => handleCategoryChange("experience")}
                      >
                        Experiences
                      </button>
                      <button
                        className={`w-full text-left px-3 py-2 rounded-md transition ${
                          selectedCategory === "improvement" 
                            ? "bg-primary/10 text-primary" 
                            : "hover:bg-muted"
                        }`}
                        onClick={() => handleCategoryChange("improvement")}
                      >
                        Improvements
                      </button>
                      <button
                        className={`w-full text-left px-3 py-2 rounded-md transition ${
                          selectedCategory === "feature" 
                            ? "bg-primary/10 text-primary" 
                            : "hover:bg-muted"
                        }`}
                        onClick={() => handleCategoryChange("feature")}
                      >
                        Feature Requests
                      </button>
                      <button
                        className={`w-full text-left px-3 py-2 rounded-md transition ${
                          selectedCategory === "safety" 
                            ? "bg-primary/10 text-primary" 
                            : "hover:bg-muted"
                        }`}
                        onClick={() => handleCategoryChange("safety")}
                      >
                        Safety
                      </button>
                      <button
                        className={`w-full text-left px-3 py-2 rounded-md transition ${
                          selectedCategory === "driver" 
                            ? "bg-primary/10 text-primary" 
                            : "hover:bg-muted"
                        }`}
                        onClick={() => handleCategoryChange("driver")}
                      >
                        Driver Feedback
                      </button>
                      <button
                        className={`w-full text-left px-3 py-2 rounded-md transition ${
                          selectedCategory === "other" 
                            ? "bg-primary/10 text-primary" 
                            : "hover:bg-muted"
                        }`}
                        onClick={() => handleCategoryChange("other")}
                      >
                        Other
                      </button>
                    </div>
                  </div>
                  
                  {/* Community guidelines */}
                  <div className="bg-card rounded-lg shadow-sm p-4">
                    <h3 className="font-medium mb-3">Community Guidelines</h3>
                    <ul className="text-sm space-y-2 text-muted-foreground">
                      <li className="flex items-start">
                        <i className="ri-checkbox-circle-line text-primary mt-0.5 mr-2"></i>
                        <span>Be respectful and considerate to other community members</span>
                      </li>
                      <li className="flex items-start">
                        <i className="ri-checkbox-circle-line text-primary mt-0.5 mr-2"></i>
                        <span>Share constructive feedback and experiences</span>
                      </li>
                      <li className="flex items-start">
                        <i className="ri-checkbox-circle-line text-primary mt-0.5 mr-2"></i>
                        <span>Do not share personal contact information publicly</span>
                      </li>
                      <li className="flex items-start">
                        <i className="ri-checkbox-circle-line text-primary mt-0.5 mr-2"></i>
                        <span>Avoid posting offensive or inappropriate content</span>
                      </li>
                    </ul>
                    <a href="#" className="text-primary text-sm hover:underline block mt-3">
                      Read Full Guidelines
                    </a>
                  </div>
                </div>
                
                {/* Main content */}
                <div className="lg:col-span-3">
                  {/* Action buttons */}
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">
                      {activeTab === "discussions" && "Community Discussions"}
                      {activeTab === "feedback" && "Feedback & Suggestions"}
                      {activeTab === "announcements" && "Official Announcements"}
                    </h2>
                    {(activeTab === "discussions" || activeTab === "feedback") && (
                      <button
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition flex items-center"
                        onClick={() => setFormOpen(true)}
                      >
                        <i className="ri-add-line mr-1"></i>
                        {activeTab === "discussions" ? "New Post" : "Give Feedback"}
                      </button>
                    )}
                  </div>
                  
                  {/* Feedback form */}
                  {formOpen && (
                    <div className="bg-card rounded-lg shadow-sm p-6 mb-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-medium">Share Your Feedback</h3>
                        <button 
                          className="text-muted-foreground hover:text-foreground"
                          onClick={() => setFormOpen(false)}
                        >
                          <i className="ri-close-line text-xl"></i>
                        </button>
                      </div>
                      <form onSubmit={handleSubmitFeedback}>
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="title" className="block text-sm font-medium mb-1">Title</label>
                            <input
                              type="text"
                              id="title"
                              name="title"
                              value={feedbackForm.title}
                              onChange={handleInputChange}
                              className="w-full p-3 bg-background border rounded-lg"
                              placeholder="Summary of your feedback"
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor="category" className="block text-sm font-medium mb-1">Category</label>
                            <select
                              id="category"
                              name="category"
                              value={feedbackForm.category}
                              onChange={handleInputChange}
                              className="w-full p-3 bg-background border rounded-lg"
                              required
                            >
                              <option value="experience">Experience</option>
                              <option value="improvement">Improvement</option>
                              <option value="feature">Feature Request</option>
                              <option value="safety">Safety</option>
                              <option value="driver">Driver Feedback</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                          <div>
                            <label htmlFor="content" className="block text-sm font-medium mb-1">Your Feedback</label>
                            <textarea
                              id="content"
                              name="content"
                              value={feedbackForm.content}
                              onChange={handleInputChange}
                              className="w-full p-3 bg-background border rounded-lg"
                              rows={4}
                              placeholder="Describe your experience or suggestion in detail"
                              required
                            ></textarea>
                          </div>
                          <div className="flex justify-end space-x-3">
                            <button
                              type="button"
                              className="px-4 py-2 border rounded-lg hover:bg-muted transition"
                              onClick={() => setFormOpen(false)}
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition"
                            >
                              Submit Feedback
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  )}
                  
                  {/* Feedback posts */}
                  {filteredPosts.length > 0 ? (
                    <div className="space-y-4">
                      {filteredPosts.map(post => (
                        <div key={post.id} className="bg-card rounded-lg shadow-sm overflow-hidden">
                          {/* Post header */}
                          <div className="p-4 border-b">
                            <div className="flex justify-between">
                              <div className="flex items-center">
                                <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                                  <img 
                                    src={post.user.avatar} 
                                    alt={post.user.name} 
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                                <div>
                                  <p className="font-medium">{post.user.name}</p>
                                  <p className="text-sm text-muted-foreground">{post.user.role}</p>
                                </div>
                              </div>
                              <div>
                                <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(post.category)}`}>
                                  {getCategoryLabel(post.category)}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Post content */}
                          <div className="p-4">
                            <h3 className="text-lg font-medium mb-2">{post.title}</h3>
                            <p className="text-muted-foreground mb-4">
                              {expandedPost === post.id 
                                ? post.content 
                                : post.content.length > 150 
                                  ? `${post.content.substring(0, 150)}...` 
                                  : post.content
                              }
                              {post.content.length > 150 && (
                                <button 
                                  className="text-primary hover:underline ml-1"
                                  onClick={() => toggleExpandPost(post.id)}
                                >
                                  {expandedPost === post.id ? "Show less" : "Read more"}
                                </button>
                              )}
                            </p>
                            
                            {/* Post actions */}
                            <div className="flex items-center text-sm text-muted-foreground">
                              <button 
                                className={`flex items-center mr-4 hover:text-foreground ${post.liked ? 'text-primary' : ''}`}
                                onClick={() => toggleLike(post.id)}
                              >
                                <i className={`${post.liked ? 'ri-heart-fill' : 'ri-heart-line'} mr-1`}></i>
                                <span>{post.likes}</span>
                              </button>
                              <button 
                                className="flex items-center mr-4 hover:text-foreground"
                                onClick={() => toggleExpandPost(post.id)}
                              >
                                <i className="ri-chat-1-line mr-1"></i>
                                <span>{post.comments}</span>
                              </button>
                              <span className="text-muted-foreground">{post.date}</span>
                            </div>
                          </div>
                          
                          {/* Comments section */}
                          {expandedPost === post.id && (
                            <div className="bg-muted/40 p-4 border-t">
                              <h4 className="font-medium mb-4">Comments</h4>
                              <div className="space-y-4">
                                {postComments.map(comment => (
                                  <div key={comment.id} className={`p-3 rounded-lg ${comment.isOfficial ? 'bg-primary/5 border border-primary/10' : 'bg-card'}`}>
                                    <div className="flex items-start mb-2">
                                      <div className="h-8 w-8 rounded-full overflow-hidden mr-2 flex-shrink-0">
                                        <img 
                                          src={comment.user.avatar} 
                                          alt={comment.user.name} 
                                          className="h-full w-full object-cover"
                                        />
                                      </div>
                                      <div>
                                        <div className="flex items-center">
                                          <p className="font-medium text-sm">{comment.user.name}</p>
                                          {comment.isOfficial && (
                                            <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                              Official
                                            </span>
                                          )}
                                        </div>
                                        <p className="text-xs text-muted-foreground">{comment.date}</p>
                                      </div>
                                    </div>
                                    <p className="text-sm ml-10">{comment.content}</p>
                                  </div>
                                ))}
                                
                                {/* Comment form */}
                                <div className="flex items-start space-x-2 mt-4">
                                  <div className="h-8 w-8 rounded-full overflow-hidden bg-muted flex-shrink-0">
                                    <i className="ri-user-line text-muted-foreground flex items-center justify-center h-full"></i>
                                  </div>
                                  <div className="flex-1">
                                    <textarea 
                                      className="w-full p-2 bg-background border rounded-lg text-sm"
                                      placeholder="Add a comment..."
                                      rows={2}
                                    ></textarea>
                                    <div className="flex justify-end mt-2">
                                      <button className="px-3 py-1 bg-primary text-white rounded-lg text-sm hover:bg-opacity-90 transition">
                                        Post
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-card rounded-lg shadow-sm p-8 text-center">
                      <div className="text-6xl text-muted-foreground mb-4">
                        <i className="ri-chat-3-line"></i>
                      </div>
                      <h3 className="text-xl font-medium mb-2">No posts in this category yet</h3>
                      <p className="text-muted-foreground mb-6">
                        Be the first to share your experience or suggestion in this category.
                      </p>
                      <button 
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition"
                        onClick={() => setFormOpen(true)}
                      >
                        Create New Post
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}