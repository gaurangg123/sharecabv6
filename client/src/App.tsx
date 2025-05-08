import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import NotFound from "./pages/not-found";
import Home from "./pages/Home";
import BookRide from "./pages/BookRide";
import MyBookings from "./pages/MyBookings";
import Plans from "./pages/Plans";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Community from "./pages/Community";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/book-ride" component={BookRide} />
      <Route path="/my-bookings" component={MyBookings} />
      <Route path="/plans" component={Plans} />
      <Route path="/profile" component={Profile} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/community" component={Community} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
