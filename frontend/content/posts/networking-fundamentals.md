---
title: "Networking Fundamentals: Understanding TCP/IP"
date: "2026-03-05"
category: "Networking"
excerpt: "Master the essential networking concepts including TCP/IP, subnetting, DNS, and common troubleshooting tools."
coverImage: "/images/posts/networking.jpg"
author: "Nattavee"
---

# Networking Fundamentals: Understanding TCP/IP

Every IT professional needs a solid understanding of networking. Let's break down the essentials of TCP/IP networking.

## The OSI Model

The OSI model has 7 layers:

| Layer | Name | Protocol Examples |
|-------|------|-------------------|
| 7 | Application | HTTP, DNS, FTP |
| 6 | Presentation | SSL/TLS, JPEG |
| 5 | Session | NetBIOS, PPTP |
| 4 | Transport | TCP, UDP |
| 3 | Network | IP, ICMP, ARP |
| 2 | Data Link | Ethernet, Wi-Fi |
| 1 | Physical | Cables, Hubs |

## IP Addressing & Subnetting

Understanding CIDR notation:

```
192.168.1.0/24
├── Network:    192.168.1.0
├── Broadcast:  192.168.1.255
├── Usable IPs: 192.168.1.1 - 192.168.1.254
└── Hosts:      254
```

## Essential Networking Commands

```bash
# Check your IP configuration
ip addr show

# Test connectivity
ping -c 4 google.com

# Trace the route to a destination
traceroute google.com

# DNS lookup
nslookup example.com
dig example.com

# Check open ports
ss -tulnp
netstat -tulnp

# Capture packets (requires root)
tcpdump -i eth0 -n port 80
```

## Configuring a Static IP (Ubuntu)

```yaml
# /etc/netplan/01-config.yaml
network:
  version: 2
  ethernets:
    eth0:
      addresses:
        - 192.168.1.100/24
      gateway4: 192.168.1.1
      nameservers:
        addresses:
          - 8.8.8.8
          - 8.8.4.4
```

Apply the configuration:

```bash
sudo netplan apply
```

## Firewall with iptables

```bash
# Allow SSH
sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT

# Allow HTTP/HTTPS
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT

# Drop all other incoming traffic
sudo iptables -A INPUT -j DROP

# Save rules
sudo iptables-save > /etc/iptables/rules.v4
```

## Conclusion

Understanding networking fundamentals is crucial for any tech career. Practice these concepts in your home lab to solidify your knowledge!
