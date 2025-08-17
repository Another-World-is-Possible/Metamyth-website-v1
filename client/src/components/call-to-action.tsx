import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function CallToAction() {
  return (
    <section className="bg-forest-green py-20 border-t border-mystical-teal/30">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2 
          className="font-edensor text-4xl md:text-5xl font-bold text-ancient-gold text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          THE INVITATION
        </motion.h2>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="bg-deep-black/50 mystical-border mystical-glow hover-glow">
              <CardContent className="p-8 text-center">
                <h3 className="font-edensor text-2xl font-bold text-mystical-teal mb-4">
                  JOIN THE FEDERATION
                </h3>
                <p className="text-silver mb-6">Build the new world with us</p>
                <Button className="bg-mystical-teal text-deep-black font-bold py-3 px-8 rounded-lg hover:bg-mystical-teal/80 transition-colors duration-300">
                  BECOME A STORYTELLER
                </Button>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card className="bg-deep-black/50 mystical-border enhanced-glow hover-glow">
              <CardContent className="p-8 text-center">
                <h3 className="font-edensor text-2xl font-bold text-ancient-gold mb-4">
                  REGENERATE YOUR STORY
                </h3>
                <p className="text-silver mb-6">Transform your organization through story</p>
                <Button className="bg-ancient-gold text-deep-black font-bold py-3 px-8 rounded-lg hover:bg-ancient-gold/80 transition-colors duration-300">
                  WORK WITH US
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
