import Image from "next/image";

const items = [
  {
    label: "BUILT FOR HEAVY TRAINING",
    icon: "/images/dumbbell.png",
    alt: "Dumbbell icon"
  },
  {
    label: "PREMIUM MATERIALS",
    icon: "/images/diamond.png",
    alt: "Diamond icon"
  },
  {
    label: "SECURE CONNECTION",
    icon: "/images/lock.png",
    alt: "Lock icon"
  },
  {
    label: "INCREASED HYPERTROPHY",
    icon: "/images/muscle.png",
    alt: "Muscle icon"
  }
];

export const TrustStrip = () => (
  <section className="border-y border-line bg-paper">
    <div className="mx-auto grid max-w-6xl gap-25px-6 py-8 text-xs uppercase tracking-[0.3em] text-mute md:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-3">
          <Image
            src={item.icon}
            alt={item.alt}
            width={80}
            height={80}
            className="h-20 w-20"
          />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  </section>
);
