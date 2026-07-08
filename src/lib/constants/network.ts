import * as THREE from "three";

export interface NetworkNode {
  id: number;
  name: string;
  country: string;
  lat: number;
  lon: number;
  type: "Tier-1 Backbone Hub" | "Cloud Region" | "Internet Exchange Point" | "Regional POP" | "Security Sensor" | "SOC";
  status: "Healthy" | "Warning" | "Maintenance" | "Offline" | "Monitoring";
  latency: number;
  routesCount: number;
  traffic: "Low" | "Medium" | "High" | "Critical";
  threatLevel: "Low" | "Medium" | "High" | "Critical";
  position: THREE.Vector3;
}

export interface NetworkLink {
  fromId: number;
  toId: number;
  type: "Tier-1" | "Regional" | "Sensor";
  points: THREE.Vector3[];
}

export interface ActivePacket {
  id: number;
  linkIndex: number;
  progress: number;
  speed: number;
  type: "General" | "Health" | "Threat" | "Alert";
  color: string;
}

// 1. Raw Coordinates Database of 60 Major Global Hubs
const BASE_HUBS = [
  // North America
  { name: "New York", country: "United States", lat: 40.7128, lon: -74.006, type: "Tier-1 Backbone Hub", status: "Healthy" },
  { name: "Washington", country: "United States", lat: 38.9072, lon: -77.0369, type: "SOC", status: "Healthy" },
  { name: "Chicago", country: "United States", lat: 41.8781, lon: -87.6298, type: "Internet Exchange Point", status: "Healthy" },
  { name: "San Francisco", country: "United States", lat: 37.7749, lon: -122.4194, type: "Tier-1 Backbone Hub", status: "Healthy" },
  { name: "Seattle", country: "United States", lat: 47.6062, lon: -122.3321, type: "Cloud Region", status: "Monitoring" },
  { name: "Los Angeles", country: "United States", lat: 34.0522, lon: -118.2437, type: "Cloud Region", status: "Healthy" },
  { name: "Dallas", country: "United States", lat: 32.7767, lon: -96.797, type: "Regional POP", status: "Maintenance" },
  { name: "Miami", country: "United States", lat: 25.7617, lon: -80.1918, type: "Internet Exchange Point", status: "Healthy" },
  { name: "Toronto", country: "Canada", lat: 43.6532, lon: -79.3832, type: "Cloud Region", status: "Healthy" },
  { name: "Vancouver", country: "Canada", lat: 49.2827, lon: -123.1207, type: "Regional POP", status: "Healthy" },
  { name: "Mexico City", country: "Mexico", lat: 19.4326, lon: -99.1332, type: "Regional POP", status: "Warning" },

  // South America
  { name: "São Paulo", country: "Brazil", lat: -23.5505, lon: -46.6333, type: "Tier-1 Backbone Hub", status: "Healthy" },
  { name: "Buenos Aires", country: "Argentina", lat: -34.6037, lon: -58.3816, type: "Regional POP", status: "Healthy" },
  { name: "Santiago", country: "Chile", lat: -33.4489, lon: -70.6693, type: "Regional POP", status: "Monitoring" },
  { name: "Bogota", country: "Colombia", lat: 4.711, lon: -74.0721, type: "Security Sensor", status: "Healthy" },

  // Europe
  { name: "London", country: "United Kingdom", lat: 51.5074, lon: -0.1278, type: "Tier-1 Backbone Hub", status: "Healthy" },
  { name: "Paris", country: "France", lat: 48.8566, lon: 2.3522, type: "SOC", status: "Healthy" },
  { name: "Amsterdam", country: "Netherlands", lat: 52.3676, lon: 4.9041, type: "Internet Exchange Point", status: "Healthy" },
  { name: "Frankfurt", country: "Germany", lat: 50.1109, lon: 8.6821, type: "Tier-1 Backbone Hub", status: "Healthy" },
  { name: "Madrid", country: "Spain", lat: 40.4168, lon: -3.7038, type: "Cloud Region", status: "Healthy" },
  { name: "Milan", country: "Italy", lat: 45.4642, lon: 9.19, type: "Regional POP", status: "Warning" },
  { name: "Stockholm", country: "Sweden", lat: 59.3293, lon: 18.0686, type: "Cloud Region", status: "Healthy" },
  { name: "Warsaw", country: "Poland", lat: 52.2297, lon: 21.0118, type: "Regional POP", status: "Healthy" },
  { name: "Dublin", country: "Ireland", lat: 53.3498, lon: -6.2603, type: "Cloud Region", status: "Healthy" },
  { name: "Lisbon", country: "Portugal", lat: 38.7223, lon: -9.1393, type: "Regional POP", status: "Monitoring" },

  // Asia / Middle East
  { name: "Tokyo", country: "Japan", lat: 35.6762, lon: 139.6503, type: "Tier-1 Backbone Hub", status: "Healthy" },
  { name: "Seoul", country: "South Korea", lat: 37.5665, lon: 126.978, type: "SOC", status: "Healthy" },
  { name: "Singapore", country: "Singapore", lat: 1.3521, lon: 103.8198, type: "Tier-1 Backbone Hub", status: "Healthy" },
  { name: "Hong Kong", country: "Hong Kong", lat: 22.3193, lon: 114.1694, type: "Internet Exchange Point", status: "Warning" },
  { name: "Mumbai", country: "India", lat: 19.076, lon: 72.8777, type: "Tier-1 Backbone Hub", status: "Healthy" },
  { name: "Delhi", country: "India", lat: 28.7041, lon: 77.1025, type: "Regional POP", status: "Healthy" },
  { name: "Bengaluru", country: "India", lat: 12.9716, lon: 77.5946, type: "Cloud Region", status: "Healthy" },
  { name: "Chennai", country: "India", lat: 13.0827, lon: 80.2707, type: "Internet Exchange Point", status: "Monitoring" },
  { name: "Dubai", country: "United Arab Emirates", lat: 25.2048, lon: 55.2708, type: "Internet Exchange Point", status: "Healthy" },
  { name: "Riyadh", country: "Saudi Arabia", lat: 24.7136, lon: 46.6753, type: "Regional POP", status: "Healthy" },
  { name: "Taipei", country: "Taiwan", lat: 25.033, lon: 121.5654, type: "Cloud Region", status: "Healthy" },
  { name: "Sydney", country: "Australia", lat: -33.8688, lon: 151.2093, type: "Tier-1 Backbone Hub", status: "Healthy" },
  { name: "Melbourne", country: "Australia", lat: -37.8136, lon: 144.9631, type: "Regional POP", status: "Healthy" },

  // Africa
  { name: "Johannesburg", country: "South Africa", lat: -26.2041, lon: 28.0473, type: "SOC", status: "Healthy" },
  { name: "Cape Town", country: "South Africa", lat: -33.9249, lon: 18.4241, type: "Regional POP", status: "Healthy" },
  { name: "Cairo", country: "Egypt", lat: 30.0444, lon: 31.2357, type: "Regional POP", status: "Offline" },
  { name: "Nairobi", country: "Kenya", lat: -1.2921, lon: 36.8219, type: "Security Sensor", status: "Healthy" },
  { name: "Lagos", country: "Nigeria", lat: 6.5244, lon: 3.3792, type: "Internet Exchange Point", status: "Monitoring" },
  { name: "Casablanca", country: "Morocco", lat: 33.5731, lon: -7.5898, type: "Regional POP", status: "Healthy" },
] as const;

// 2. Spherical Coordinate Conversion Helper (Sphere Radius R = 1.97)
export function latLonToVector3(lat: number, lon: number, radius = 1.97): THREE.Vector3 {
  const phi = (lat * Math.PI) / 180;
  const theta = (-lon * Math.PI) / 180;

  return new THREE.Vector3(
    radius * Math.cos(phi) * Math.sin(theta),
    radius * Math.sin(phi),
    radius * Math.cos(phi) * Math.cos(theta)
  );
}

// 3. Spawns dense network structure programmatically (adding local POP/Sensors spokes to Tier-1 Hubs)
export function generateNetworkData(): { nodes: NetworkNode[]; links: NetworkLink[] } {
  const nodes: NetworkNode[] = [];
  const links: NetworkLink[] = [];
  let nodeIdCounter = 0;

  // Map hubs to nodes array
  BASE_HUBS.forEach((hub) => {
    // Generate realistic status-related values
    let latency = 12 + Math.floor(Math.random() * 25);
    if (hub.status === "Warning") latency += 45;
    if (hub.status === "Maintenance") latency += 80;
    if (hub.status === "Offline") latency = 999;

    const traffic = hub.status === "Offline" ? "Low" : (["Low", "Medium", "High", "Critical"][Math.floor(Math.random() * 4)] as any);
    const threatLevel = hub.status === "Offline" ? "Low" : (["Low", "Medium", "High", "Critical"][Math.floor(Math.random() * 4)] as any);

    nodes.push({
      id: nodeIdCounter++,
      name: hub.name,
      country: hub.country,
      lat: hub.lat,
      lon: hub.lon,
      type: hub.type as any,
      status: hub.status as any,
      latency,
      routesCount: 0,
      traffic,
      threatLevel,
      position: latLonToVector3(hub.lat, hub.lon),
    });
  });

  // Programmatically spawn ~130 local "spoke" sensors clustered around major hubs (reaching 180+ nodes total)
  const tier1Hubs = nodes.filter((n) => n.type === "Tier-1 Backbone Hub" || n.type === "SOC");
  
  tier1Hubs.forEach((hub) => {
    const numSpokes = 3 + Math.floor(Math.random() * 4); // 3 to 6 spokes per major hub
    for (let s = 0; s < numSpokes; s++) {
      // Offset lat/lon slightly (within 1.5 - 4.5 degrees radius)
      const latOffset = (Math.random() - 0.5) * 6;
      const lonOffset = (Math.random() - 0.5) * 6;
      const lat = hub.lat + latOffset;
      const lon = hub.lon + lonOffset;

      const type = Math.random() > 0.4 ? "Security Sensor" : "Regional POP";
      const status = Math.random() > 0.95 ? "Warning" : (Math.random() > 0.97 ? "Offline" : "Healthy");
      
      let latency = 5 + Math.floor(Math.random() * 15);
      if (status === "Offline") latency = 999;

      const spokeId = nodeIdCounter++;
      const position = latLonToVector3(lat, lon);

      nodes.push({
        id: spokeId,
        name: `${hub.name} edge-${s + 1}`,
        country: hub.country,
        lat,
        lon,
        type: type as any,
        status: status as any,
        latency,
        routesCount: 1,
        traffic: (["Low", "Medium", "High"][Math.floor(Math.random() * 3)] as any),
        threatLevel: (["Low", "Medium", "High"][Math.floor(Math.random() * 3)] as any),
        position,
      });

      // Connect spoke to parent hub
      links.push({
        fromId: spokeId,
        toId: hub.id,
        type: "Sensor",
        points: getBezierPoints(position, hub.position, 12), // Fewer points for local links
      });
    }
  });

  // Helper map to find node by name
  const findNodeByName = (name: string) => nodes.find((n) => n.name === name);

  // 4. Define realistic undersea subsea cables and backbone links
  const BACKBONE_ROUTES = [
    // North America
    ["Seattle", "San Francisco"],
    ["San Francisco", "Los Angeles"],
    ["Los Angeles", "Dallas"],
    ["Dallas", "Chicago"],
    ["Chicago", "New York"],
    ["New York", "Washington"],
    ["Washington", "Miami"],
    ["Miami", "Dallas"],
    ["Dallas", "Los Angeles"],
    ["Toronto", "Chicago"],
    ["Vancouver", "Seattle"],

    // Europe
    ["London", "Amsterdam"],
    ["Amsterdam", "Frankfurt"],
    ["Frankfurt", "Paris"],
    ["Paris", "Madrid"],
    ["Madrid", "Lisbon"],
    ["Paris", "Milan"],
    ["Milan", "Frankfurt"],
    ["Frankfurt", "Stockholm"],
    ["Frankfurt", "Warsaw"],
    ["Dublin", "London"],

    // Asia Backbone
    ["Tokyo", "Seoul"],
    ["Seoul", "Taipei"],
    ["Taipei", "Hong Kong"],
    ["Hong Kong", "Singapore"],
    ["Singapore", "Mumbai"],
    ["Mumbai", "Delhi"],
    ["Delhi", "Bengaluru"],
    ["Bengaluru", "Chennai"],
    ["Mumbai", "Dubai"],
    ["Dubai", "Riyadh"],

    // Intercontinental Undersea Routes
    ["London", "New York"],
    ["Frankfurt", "Singapore"],
    ["Tokyo", "San Francisco"],
    ["Sydney", "Singapore"],
    ["São Paulo", "Miami"],
    ["Sydney", "Melbourne"],
    
    // South America
    ["São Paulo", "Buenos Aires"],
    ["São Paulo", "Santiago"],
    ["Bogota", "Miami"],

    // Africa
    ["Cairo", "Dubai"],
    ["Cairo", "Athens"],
    ["Nairobi", "Johannesburg"],
    ["Johannesburg", "Cape Town"],
    ["Lagos", "London"],
    ["Casablanca", "Madrid"],
  ];

  BACKBONE_ROUTES.forEach(([fromName, toName]) => {
    const fromNode = findNodeByName(fromName);
    const toNode = findNodeByName(toName);

    if (fromNode && toNode) {
      const isTier1 =
        (fromNode.type === "Tier-1 Backbone Hub" && toNode.type === "Tier-1 Backbone Hub") ||
        (fromNode.name === "London" && toNode.name === "New York") ||
        (fromNode.name === "Frankfurt" && toNode.name === "Singapore") ||
        (fromNode.name === "Tokyo" && toNode.name === "San Francisco") ||
        (fromNode.name === "Sydney" && toNode.name === "Singapore") ||
        (fromNode.name === "São Paulo" && toNode.name === "Miami");

      links.push({
        fromId: fromNode.id,
        toId: toNode.id,
        type: isTier1 ? "Tier-1" : "Regional",
        points: getBezierPoints(fromNode.position, toNode.position, 24), // Higher resolution for long backbones
      });
    }
  });

  // Compute routesCount for nodes based on links
  links.forEach((link) => {
    const fNode = nodes[link.fromId];
    const tNode = nodes[link.toId];
    if (fNode) fNode.routesCount++;
    if (tNode) tNode.routesCount++;
  });

  return { nodes, links };
}

// 5. Great-Circle Arc Generator (creates Bezier curves that bend outwards based on distance)
export function getBezierPoints(p1: THREE.Vector3, p2: THREE.Vector3, pointsCount = 20): THREE.Vector3[] {
  const distance = p1.distanceTo(p2);
  const midPoint = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
  
  // Height increases for longer links
  const height = 0.03 + 0.28 * (distance / 4.0);
  const controlPoint = midPoint.clone().normalize().multiplyScalar(1.97 + height); // 1.97 is Earth sphere radius

  const curve = new THREE.QuadraticBezierCurve3(p1, controlPoint, p2);
  return curve.getPoints(pointsCount);
}
