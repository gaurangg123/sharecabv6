import { 
  users, type User, type InsertUser,
  rides, type Ride, type InsertRide,
  bookings, type Booking, type InsertBooking
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Ride methods
  getRide(id: number): Promise<Ride | undefined>;
  getAllRides(): Promise<Ride[]>;
  createRide(ride: InsertRide): Promise<Ride>;
  updateRideSeats(id: number, availableSeats: number): Promise<Ride | undefined>;
  findRides(origin: string, destination: string, date: Date): Promise<Ride[]>;

  // Booking methods
  getBooking(id: number): Promise<Booking | undefined>;
  getUserBookings(userId: number): Promise<Booking[]>;
  getRideBookings(rideId: number): Promise<Booking[]>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBookingStatus(id: number, status: string): Promise<Booking | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private rides: Map<number, Ride>;
  private bookings: Map<number, Booking>;
  
  private userId: number;
  private rideId: number;
  private bookingId: number;

  constructor() {
    this.users = new Map();
    this.rides = new Map();
    this.bookings = new Map();
    
    this.userId = 1;
    this.rideId = 1;
    this.bookingId = 1;

    // Add some initial data
    this.createUser({
      username: "driver1",
      password: "password123",
      email: "driver1@example.com",
      fullName: "John Driver"
    });

    this.createUser({
      username: "passenger1",
      password: "password123",
      email: "passenger1@example.com",
      fullName: "Alice Passenger"
    });

    this.createRide({
      driverId: 1,
      origin: "New York",
      destination: "Boston",
      departureDate: new Date("2023-08-01T10:00:00"),
      availableSeats: 3,
      price: 25
    });

    this.createRide({
      driverId: 1,
      origin: "Chicago",
      destination: "Detroit",
      departureDate: new Date("2023-08-05T09:00:00"),
      availableSeats: 2,
      price: 20
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username.toLowerCase() === username.toLowerCase()
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const now = new Date();
    const user: User = { ...insertUser, id, createdAt: now };
    this.users.set(id, user);
    return user;
  }

  // Ride methods
  async getRide(id: number): Promise<Ride | undefined> {
    return this.rides.get(id);
  }

  async getAllRides(): Promise<Ride[]> {
    return Array.from(this.rides.values());
  }

  async createRide(insertRide: InsertRide): Promise<Ride> {
    const id = this.rideId++;
    const now = new Date();
    const ride: Ride = { ...insertRide, id, createdAt: now };
    this.rides.set(id, ride);
    return ride;
  }

  async updateRideSeats(id: number, availableSeats: number): Promise<Ride | undefined> {
    const ride = this.rides.get(id);
    if (!ride) return undefined;
    
    const updatedRide = { ...ride, availableSeats };
    this.rides.set(id, updatedRide);
    return updatedRide;
  }

  async findRides(origin: string, destination: string, date: Date): Promise<Ride[]> {
    // Simple filtering logic - in a real app, this would be more sophisticated
    return Array.from(this.rides.values()).filter(ride => {
      const isSameDay = ride.departureDate.toDateString() === date.toDateString();
      const isOriginMatch = ride.origin.toLowerCase().includes(origin.toLowerCase());
      const isDestinationMatch = ride.destination.toLowerCase().includes(destination.toLowerCase());
      return isSameDay && isOriginMatch && isDestinationMatch;
    });
  }

  // Booking methods
  async getBooking(id: number): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async getUserBookings(userId: number): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(
      booking => booking.userId === userId
    );
  }

  async getRideBookings(rideId: number): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(
      booking => booking.rideId === rideId
    );
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = this.bookingId++;
    const now = new Date();
    const booking: Booking = { 
      ...insertBooking, 
      id, 
      status: "pending", 
      createdAt: now 
    };
    this.bookings.set(id, booking);
    return booking;
  }

  async updateBookingStatus(id: number, status: string): Promise<Booking | undefined> {
    const booking = this.bookings.get(id);
    if (!booking) return undefined;
    
    const updatedBooking = { ...booking, status };
    this.bookings.set(id, updatedBooking);
    return updatedBooking;
  }
}

export const storage = new MemStorage();
