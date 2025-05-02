import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { faker } from "@faker-js/faker";
import {
  ChevronRight,
  Clock,
  Gift,
  Headphones,
  HeartHandshake,
  Mail,
  ShieldCheck,
  ShoppingCart,
  Star,
  Tag,
  Truck,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

const Home = () => {
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariant = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Loyal Customer",
      comment:
        "I've been shopping here for years and the quality has always been exceptional. The customer service goes above and beyond every time!",
      rating: 5,
      avatar: faker.image.avatar(),
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "First-time Buyer",
      comment:
        "My first purchase exceeded all expectations. Fast shipping, beautiful packaging, and the product was even better than pictured.",
      rating: 5,
      avatar: faker.image.avatar(),
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Regular Shopper",
      comment:
        "The attention to detail sets this shop apart. Every order feels special and the newsletter has the best exclusive deals!",
      rating: 5,
      avatar: faker.image.avatar(),
    },
  ];

  return (
    <div className="flex flex-col min-h-dvh font-sans overflow-hidden">
      <motion.section
        className="relative bg-blue-50 bg-opacity-80"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <img
          src="/hero-image.png"
          alt="Hero"
          className="absolute inset-0 object-fill opacity-50"
        />
        <div className="relative py-24 px-6 text-center z-10">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-zinc-800 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Discover the Best Products Online
          </motion.h1>
          <motion.p
            className="text-lg text-zinc-600 mb-6 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Shop curated collections from top brands with exclusive discounts
            just for you.
          </motion.p>

          <Button
            asChild
            className="bg-blue-600 text-white hover:bg-blue-700 transition-all hover:scale-105 cursor-pointer"
          >
            <Link to="/products">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Start Shopping
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </motion.section>

      <section className="py-16 px-6 bg-zinc-50 bg-opacity-90 relative z-10">
        <motion.h2
          className="text-2xl font-semibold text-zinc-800 mb-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          Why Shop With Us?
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div
            className="p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition text-center"
            variants={itemVariant}
            whileHover={{
              y: -5,
              boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
            }}
          >
            <motion.div
              initial={{ y: 0 }}
              whileHover={{ y: -3 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 10,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <Truck className="w-8 h-8 mx-auto text-blue-600 mb-3" />
            </motion.div>
            <h3 className="text-lg font-semibold text-zinc-800 mb-2">
              Fast Delivery
            </h3>
            <p className="text-sm text-zinc-600">
              Get your orders delivered in 2-3 days nationwide.
            </p>
          </motion.div>

          <motion.div
            className="p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition text-center"
            variants={itemVariant}
            whileHover={{
              y: -5,
              boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
            }}
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
              }}
            >
              <ShieldCheck className="w-8 h-8 mx-auto text-blue-600 mb-3" />
            </motion.div>
            <h3 className="text-lg font-semibold text-zinc-800 mb-2">
              Secure Payments
            </h3>
            <p className="text-sm text-zinc-600">
              Your data is encrypted and payments are safe with us.
            </p>
          </motion.div>

          <motion.div
            className="p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition text-center"
            variants={itemVariant}
            whileHover={{
              y: -5,
              boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
            }}
          >
            <motion.div
              whileHover={{ rotate: 10 }}
              transition={{ type: "spring", stiffness: 500 }}
            >
              <HeartHandshake className="w-8 h-8 mx-auto text-blue-600 mb-3" />
            </motion.div>
            <h3 className="text-lg font-semibold text-zinc-800 mb-2">
              Customer Support
            </h3>
            <p className="text-sm text-zinc-600">
              Our friendly team is here for you 24/7.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-500 to-purple-500 relative z-10">
        <motion.h2
          className="text-2xl font-semibold text-white mb-2 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          What Our Customers Say
        </motion.h2>
        <motion.p
          className="text-blue-100 mb-12 text-center max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Don't just take our word for it — hear from our happy customers
        </motion.p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              className="bg-white rounded-xl p-6 shadow-lg"
              variants={itemVariant}
              whileHover={{
                y: -5,
                boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.15)",
              }}
            >
              <div className="flex items-center mb-4">
                <motion.img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-200"
                  whileHover={{ scale: 1.1 }}
                />
                <div className="ml-4">
                  <h3 className="font-semibold text-zinc-800">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-zinc-500">{testimonial.role}</p>
                </div>
              </div>

              <p className="text-zinc-600 mb-4 italic">
                "{testimonial.comment}"
              </p>

              <div className="flex text-yellow-400">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Shopping Benefits Section */}
      <section className="py-16 px-6 bg-zinc-100 bg-opacity-90 relative z-10">
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-2xl font-semibold text-zinc-800 mb-10 text-center"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            Shop With Confidence
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <motion.div
              className="bg-white p-5 rounded-xl text-center shadow-sm"
              whileHover={{
                y: -5,
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.05)",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Tag className="h-8 w-8 mx-auto text-blue-600 mb-3" />
              <h3 className="font-medium text-zinc-800 mb-1">Best Prices</h3>
              <p className="text-xs text-zinc-500">Guaranteed low prices</p>
            </motion.div>

            <motion.div
              className="bg-white p-5 rounded-xl text-center shadow-sm"
              whileHover={{
                y: -5,
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.05)",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Clock className="h-8 w-8 mx-auto text-blue-600 mb-3" />
              <h3 className="font-medium text-zinc-800 mb-1">Easy Returns</h3>
              <p className="text-xs text-zinc-500">30-day money back</p>
            </motion.div>

            <motion.div
              className="bg-white p-5 rounded-xl text-center shadow-sm"
              whileHover={{
                y: -5,
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.05)",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Headphones className="h-8 w-8 mx-auto text-blue-600 mb-3" />
              <h3 className="font-medium text-zinc-800 mb-1">Always Here</h3>
              <p className="text-xs text-zinc-500">24/7 customer support</p>
            </motion.div>

            <motion.div
              className="bg-white p-5 rounded-xl text-center shadow-sm"
              whileHover={{
                y: -5,
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.05)",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Gift className="h-8 w-8 mx-auto text-blue-600 mb-3" />
              <h3 className="font-medium text-zinc-800 mb-1">Gift Wrapping</h3>
              <p className="text-xs text-zinc-500">Complimentary service</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="py-16 px-6 bg-white bg-opacity-95 relative z-10">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0.6 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img
              src="/newsletter.png"
              alt="Newsletter"
              className="mx-auto mb-6 rounded-lg w-full max-w-xs object-cover shadow-md"
            />
          </motion.div>
          <h2 className="text-2xl font-semibold text-zinc-800 mb-4">
            Stay Updated
          </h2>
          <p className="text-zinc-600 mb-6">
            Subscribe to our newsletter for the latest deals and updates.
          </p>
          <div className="flex items-center gap-2 justify-center flex-wrap">
            <div className="w-full max-w-xs">
              <Input
                placeholder="Enter your email"
                className="rounded-xl border-blue-200"
              />
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Mail className="w-4 h-4 mr-2" />
              Subscribe
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
