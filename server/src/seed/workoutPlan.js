export const workoutPlan = {
  name: "Beginner 4-Day Fat Loss Program",
  description: "A bilingual 4-day plan converted from the workout sheet with warmups, circuit blocks, cardio, and coaching notes.",
  totalDays: 4,
  status: "published",
  isTemplate: true,
  days: [
    {
      dayNumber: 1,
      title: "Day 1",
      focusArea: "Interior muscle",
      warmup: {
        title: "Treadmill walk and shoulder preparation",
        duration: "8-10 min",
        speed: "3.5-4",
        gradient: "0-3",
        instructions: "Walk steadily, then prepare shoulders and wrists before upper-body machines.",
        notes: {
          en: "Warm up before lifting and keep breathing calm.",
          ar: "ابدأ بالإحماء قبل التمرين وحافظ على تنفس ثابت."
        }
      },
      notes: {
        en: "Move slowly on the way down and squeeze the target muscle at the end of each rep.",
        ar: "النزول يكون ببطء مع عصر العضلة المستهدفة في نهاية الحركة."
      },
      cardio: [
        {
          machine: "Treadmill",
          speed: "4",
          gradient: "12",
          time: "25 min",
          targetHeartRate: "135-145",
          notes: {
            en: "Monitor heart rate throughout cardio.",
            ar: "راقب نبض القلب طوال فترة الكارديو."
          }
        }
      ],
      exercises: [
        { name: "Chest press machine", sets: "3", reps: "12", rest: "60 sec", preNote: "Pre-failure", circuitGroup: "Circuit 1", order: 1 },
        { name: "Leg extension", sets: "3", reps: "12", rest: "60 sec", preNote: "Pre-failure", circuitGroup: "Circuit 1", order: 2 },
        { name: "Leg abduction", sets: "3", reps: "15", rest: "45 sec", circuitGroup: "Circuit 1", order: 3 },
        { name: "Pec fly machine", sets: "3", reps: "12", rest: "60 sec", circuitGroup: "Circuit 2", order: 4 },
        { name: "Crunches machine", sets: "3", reps: "15", rest: "45 sec", circuitGroup: "Circuit 2", order: 5 },
        { name: "Plank", sets: "3", reps: "30-45 sec", rest: "45 sec", circuitGroup: "Core", order: 6 }
      ]
    },
    {
      dayNumber: 2,
      title: "Day 2",
      focusArea: "Posterior muscle",
      warmup: {
        title: "Bike warm-up",
        duration: "8 min",
        speed: "",
        gradient: "",
        instructions: "Use easy resistance and prepare hips, back, and shoulders.",
        notes: {
          en: "Keep the back stable during pulling movements.",
          ar: "حافظ على ثبات الظهر أثناء تمارين السحب."
        }
      },
      notes: {
        en: "Keep wrists neutral. Contact the coach if a demo video is unclear.",
        ar: "حافظ على وضعية الرسغ مستقيمة وتواصل مع المدرب إذا كان الفيديو غير واضح."
      },
      cardio: [
        {
          machine: "Recumbent bike",
          level: "8",
          time: "25 min",
          targetHeartRate: "135-145",
          notes: {
            en: "Steady pace after workout.",
            ar: "سرعة ثابتة بعد التمرين."
          }
        }
      ],
      exercises: [
        { name: "Wide grip lat pulldown", sets: "3", reps: "12", rest: "60 sec", circuitGroup: "Circuit 1", order: 1 },
        { name: "Back extension", sets: "3", reps: "12", rest: "60 sec", circuitGroup: "Circuit 1", order: 2 },
        { name: "T-bar row", sets: "3", reps: "10-12", rest: "75 sec", circuitGroup: "Circuit 2", order: 3 },
        { name: "DB lateral raises", sets: "3", reps: "12-15", rest: "45 sec", circuitGroup: "Circuit 2", order: 4 },
        { name: "Seated cable row wide", sets: "3", reps: "12", rest: "60 sec", circuitGroup: "Circuit 3", order: 5 }
      ]
    },
    {
      dayNumber: 3,
      title: "Day 3",
      focusArea: "Lower body and push",
      warmup: {
        title: "Incline walk",
        duration: "10 min",
        speed: "3.5",
        gradient: "5",
        instructions: "Increase temperature before leg press and squat work.",
        notes: {
          en: "Do not rush the first working set.",
          ar: "لا تستعجل في أول مجموعة عمل."
        }
      },
      notes: {
        en: "Control the negative phase and avoid locking joints hard.",
        ar: "تحكم في مرحلة النزول وتجنب قفل المفاصل بقوة."
      },
      cardio: [
        {
          machine: "Treadmill",
          speed: "3.5",
          gradient: "12",
          time: "25 min",
          targetHeartRate: "135-145"
        }
      ],
      exercises: [
        { name: "Leg press machine", sets: "4", reps: "12", rest: "75 sec", circuitGroup: "Strength", order: 1 },
        { name: "Incline chest press", sets: "3", reps: "10-12", rest: "60 sec", circuitGroup: "Circuit 1", order: 2 },
        { name: "Hack squat machine", sets: "3", reps: "12", rest: "75 sec", circuitGroup: "Circuit 1", order: 3 },
        { name: "Preacher curl biceps", sets: "3", reps: "12", rest: "45 sec", circuitGroup: "Circuit 2", order: 4 },
        { name: "Walking lunges", sets: "3", reps: "20 steps", rest: "60 sec", circuitGroup: "Circuit 2", order: 5 }
      ]
    },
    {
      dayNumber: 4,
      title: "Day 4",
      focusArea: "Glutes, back, and conditioning",
      warmup: {
        title: "Glute activation and walk",
        duration: "10 min",
        speed: "4",
        gradient: "3",
        instructions: "Warm hips and shoulders before the main circuit.",
        notes: {
          en: "Focus on stable posture before adding load.",
          ar: "ركز على ثبات الجسم قبل زيادة الوزن."
        }
      },
      notes: {
        en: "Squeeze the working muscle and keep movement quality high.",
        ar: "اعصر العضلة العاملة وحافظ على جودة الحركة."
      },
      cardio: [
        {
          machine: "Recumbent bike",
          level: "8",
          time: "25 min",
          targetHeartRate: "135-145"
        }
      ],
      exercises: [
        { name: "Hip thrust machine", sets: "4", reps: "12", rest: "75 sec", circuitGroup: "Strength", order: 1 },
        { name: "Seated cable row wide", sets: "3", reps: "12", rest: "60 sec", circuitGroup: "Circuit 1", order: 2 },
        { name: "Leg abduction", sets: "3", reps: "15", rest: "45 sec", circuitGroup: "Circuit 1", order: 3 },
        { name: "DB lateral raises", sets: "3", reps: "12-15", rest: "45 sec", circuitGroup: "Circuit 2", order: 4 },
        { name: "Crunches machine", sets: "3", reps: "15", rest: "45 sec", circuitGroup: "Circuit 2", order: 5 },
        { name: "Plank", sets: "3", reps: "45 sec", rest: "45 sec", circuitGroup: "Core", order: 6 }
      ]
    }
  ]
};
