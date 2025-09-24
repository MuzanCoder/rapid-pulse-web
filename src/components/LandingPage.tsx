import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Shield, Zap, Users, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

const LandingPage = () => {
  const features = [
    {
      icon: Shield,
      title: "Secure Authentication",
      description: "Enterprise-grade security with JWT tokens and password hashing"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized performance with real-time updates and caching"
    },
    {
      icon: Users,
      title: "Team Collaboration", 
      description: "Work together seamlessly with shared projects and tasks"
    }
  ];

  const benefits = [
    "Complete CRUD operations for task management",
    "Real-time search and filtering capabilities", 
    "Responsive design for all devices",
    "Secure user authentication and profiles",
    "Scalable architecture ready for growth"
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Navigation */}
      <nav className="px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg"></div>
          <span className="text-xl font-bold">TaskFlow</span>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link to="/register">
            <Button variant="default">Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-slide-up">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Build Better
                <span className="bg-gradient-primary bg-clip-text text-transparent"> Projects</span>
                <br />
                Together
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                The complete platform for modern teams. Manage tasks, collaborate seamlessly, and scale your projects with confidence.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register">
                <Button variant="default" size="lg" className="group">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                Watch Demo
              </Button>
            </div>

            <div className="flex items-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>Free 14-day trial</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>No credit card required</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-primary opacity-20 blur-xl rounded-3xl animate-float"></div>
            <img
              src={heroImage}
              alt="TaskFlow Dashboard Preview"
              className="relative rounded-2xl shadow-2xl w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold">Why Choose TaskFlow?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built with modern technologies and best practices for maximum performance and scalability.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="p-8 text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold">Everything You Need to Succeed</h3>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
              <Link to="/register">
                <Button variant="default" size="lg">
                  Get Started Today
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <Card className="p-8">
              <div className="space-y-6">
                <h4 className="text-2xl font-bold">Ready to Transform Your Workflow?</h4>
                <p className="text-muted-foreground">
                  Join thousands of teams already using TaskFlow to build better projects faster.
                </p>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">10k+</div>
                    <div className="text-muted-foreground">Active Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">500+</div>
                    <div className="text-muted-foreground">Companies</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">99.9%</div>
                    <div className="text-muted-foreground">Uptime</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 bg-muted">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-gradient-primary rounded"></div>
            <span className="text-lg font-bold">TaskFlow</span>
          </div>
          <p className="text-muted-foreground">
            © 2024 TaskFlow. Built with modern technologies for the future.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;