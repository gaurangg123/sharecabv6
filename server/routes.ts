import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoints for users
  app.post("/api/users/register", async (req, res) => {
    try {
      const { username, password, email, fullName } = req.body;
      
      // Check if user already exists
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
      
      const existingEmail = await storage.getUserByEmail(email);
      if (existingEmail) {
        return res.status(400).json({ message: "Email already exists" });
      }
      
      const user = await storage.createUser({ username, password, email, fullName });
      // Don't return password in response
      const { password: _, ...userWithoutPassword } = user;
      
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Error creating user", error });
    }
  });

  // API endpoints for rides
  app.post("/api/rides", async (req, res) => {
    try {
      const { driverId, origin, destination, departureDate, availableSeats, price } = req.body;
      const ride = await storage.createRide({ 
        driverId, 
        origin, 
        destination, 
        departureDate, 
        availableSeats, 
        price 
      });
      
      res.status(201).json(ride);
    } catch (error) {
      res.status(500).json({ message: "Error creating ride", error });
    }
  });

  app.get("/api/rides", async (req, res) => {
    try {
      const { origin, destination, date } = req.query;
      
      // If search parameters are provided, filter rides
      if (origin && destination && date) {
        const rides = await storage.findRides(
          origin as string,
          destination as string,
          new Date(date as string)
        );
        return res.json(rides);
      }
      
      // Otherwise, return all rides
      const rides = await storage.getAllRides();
      res.json(rides);
    } catch (error) {
      res.status(500).json({ message: "Error fetching rides", error });
    }
  });

  // API endpoints for bookings
  app.post("/api/bookings", async (req, res) => {
    try {
      const { rideId, userId, seats } = req.body;
      
      // Validate ride exists and has enough seats
      const ride = await storage.getRide(rideId);
      if (!ride) {
        return res.status(404).json({ message: "Ride not found" });
      }
      
      if (ride.availableSeats < seats) {
        return res.status(400).json({ message: "Not enough available seats" });
      }
      
      // Create booking
      const booking = await storage.createBooking({ rideId, userId, seats });
      
      // Update available seats
      await storage.updateRideSeats(rideId, ride.availableSeats - seats);
      
      res.status(201).json(booking);
    } catch (error) {
      res.status(500).json({ message: "Error creating booking", error });
    }
  });

  // Newsletter subscription
  app.post("/api/newsletter", (req, res) => {
    // In a real implementation, this would store the email or send it to an email service
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    
    // Simulate successful subscription
    res.status(200).json({ message: "Subscription successful" });
  });

  const httpServer = createServer(app);

  return httpServer;
}
