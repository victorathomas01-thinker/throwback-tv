// Throwback TV 2.0 programming catalog.
// Metadata only: this project does not host or distribute copyrighted video.

window.THROWBACK_CHANNELS = [
  {
    id: "jetix",
    number: 21,
    name: "Jetix",
    tagline: "Action after school.",
    accent: "#ff4d37",
    description: "Action, martial arts, anime, monsters and adventure-heavy blocks.",
    defaultEra: "2006",
    eras: {
      "2005": {
        shows: [
          { title: "Power Rangers SPD", category: "action", dayparts: ["morning", "after-school", "prime"], episodes: ["Beginnings Part 1", "Beginnings Part 2", "Confronted", "Walls", "Dogged", "Shadow Part 1"] },
          { title: "Super Robot Monkey Team Hyperforce Go!", category: "action", dayparts: ["morning", "after-school", "prime"], episodes: ["Chiro's Girl", "Depths of Fear", "Planetoid Q", "Magnetic Menace", "Skeleton King"] },
          { title: "Digimon Frontier", category: "anime", dayparts: ["morning", "after-school"], episodes: ["All Aboard", "Lobomon", "Kumamon Baby, Light My Fire", "Kazemon Kicks It"] },
          { title: "Get Ed", category: "action", dayparts: ["after-school", "prime"], episodes: ["The Tiki", "Omnis", "Mister Fix-It", "Z3R0"] }
        ]
      },
      "2006": {
        shows: [
          { title: "Power Rangers SPD", category: "action", dayparts: ["morning", "after-school", "prime"], episodes: ["Beginnings Part 1", "Beginnings Part 2", "Shadow Part 1", "Shadow Part 2", "Endings Part 1", "Endings Part 2"] },
          { title: "Yin Yang Yo!", category: "action-comedy", dayparts: ["morning", "after-school", "prime"], episodes: ["Dojo Alone", "Woo Foo Flu", "The Trouble with Two-ni-corns", "Old School"] },
          { title: "Pucca", category: "comedy", dayparts: ["morning", "after-school"], episodes: ["Funny Love", "Dance Pucca Dance", "Cat Toy", "Chef Slump"] },
          { title: "Super Robot Monkey Team Hyperforce Go!", category: "action", dayparts: ["after-school", "prime", "late"], episodes: ["Skeleton King", "Thingy", "Wonder Fun Meat World", "Galactic Smash"] },
          { title: "Digimon Data Squad", category: "anime", dayparts: ["after-school", "prime"], episodes: ["There Are Monsters Among Us", "Marcus' Inner Strength", "The Return of Thomas"] }
        ]
      }
    }
  },
  {
    id: "disney",
    number: 22,
    name: "Disney Channel",
    tagline: "Sitcoms, cartoons and DCOM energy.",
    accent: "#66d6ff",
    description: "Animated hits, sitcoms, original movies and after-school comfort TV.",
    defaultEra: "2004",
    eras: {
      "2003": {
        shows: [
          { title: "Kim Possible", category: "animation", dayparts: ["morning", "after-school", "prime"], episodes: ["Crush", "Sink or Swim", "The New Ron", "Bueno Nacho", "Monkey Fist Strikes"] },
          { title: "That's So Raven", category: "sitcom", dayparts: ["after-school", "prime", "late"], episodes: ["Mother Dearest", "A Fish Called Raven", "Wake Up Victor", "Test of Friendship"] },
          { title: "Lizzie McGuire", category: "sitcom", dayparts: ["morning", "after-school", "prime"], episodes: ["Rumors", "Picture Day", "Between a Rock and a Bra Place", "Gordo's Bar Mitzvah"] },
          { title: "Even Stevens", category: "sitcom", dayparts: ["morning", "late"], episodes: ["Swap.com", "Movie Madness", "Influenza: The Musical"] }
        ]
      },
      "2004": {
        shows: [
          { title: "Kim Possible", category: "animation", dayparts: ["morning", "after-school", "prime"], episodes: ["Car Trouble", "Rufus in Show", "Adventures in Rufus-Sitting", "Exchange"] },
          { title: "That's So Raven", category: "sitcom", dayparts: ["after-school", "prime", "late"], episodes: ["Out of Control", "Don't Have a Cow", "Run Raven Run", "Clothes Minded"] },
          { title: "The Proud Family", category: "animation", dayparts: ["morning", "after-school"], episodes: ["Bring It On", "Hooray for Iesha", "She Drives Me Crazy", "The Camp, the Counselor, the Mole and the Rock"] },
          { title: "Phil of the Future", category: "sitcom", dayparts: ["after-school", "prime"], episodes: ["Your Cheatin' Heart", "Unification Day", "Phillin' In"] },
          { title: "Lilo & Stitch: The Series", category: "animation", dayparts: ["morning", "after-school"], episodes: ["Cannonball", "Yapper", "Spooky"] }
        ]
      },
      "2006": {
        shows: [
          { title: "The Suite Life of Zack & Cody", category: "sitcom", dayparts: ["after-school", "prime", "late"], episodes: ["Odd Couples", "French 101", "Forever Plaid", "Books & Birdhouses"] },
          { title: "That's So Raven", category: "sitcom", dayparts: ["after-school", "prime"], episodes: ["Rae of Sunshine", "The Dress Is Always Greener", "Driving Miss Lazy"] },
          { title: "Hannah Montana", category: "sitcom", dayparts: ["after-school", "prime"], episodes: ["Lilly, Do You Want to Know a Secret?", "Miley Get Your Gum", "She's a Supersneak!"] },
          { title: "The Emperor's New School", category: "animation", dayparts: ["morning", "after-school"], episodes: ["Rabbit Face", "Girls Behaving Oddly", "The Mystery of Micchu Pachu"] },
          { title: "Kim Possible", category: "animation", dayparts: ["morning", "after-school"], episodes: ["Emotion Sickness", "Bad Boy", "And the Mole Rat Will Be CGI"] }
        ]
      }
    }
  },
  {
    id: "toon-disney",
    number: 23,
    name: "Toon Disney",
    tagline: "Cartoons all day.",
    accent: "#8d79ff",
    description: "Disney animation, reruns and weekday cartoon blocks.",
    defaultEra: "2004",
    eras: {
      "2002": {
        shows: [
          { title: "House of Mouse", category: "animation", dayparts: ["morning", "after-school", "prime"], episodes: ["The Stolen Cartoons", "Big Bad Wolf Daddy", "Donald's Pumbaa Prank", "Everybody Loves Mickey"] },
          { title: "Recess", category: "animation", dayparts: ["morning", "after-school"], episodes: ["The Break In", "The New Kid", "Parents' Night", "The Box"] },
          { title: "Lloyd in Space", category: "animation", dayparts: ["morning", "after-school", "late"], episodes: ["The Big Sleepover", "Double Date", "The Thrilla at Intrepidvilla", "Nora's Big Date"] },
          { title: "Pepper Ann", category: "animation", dayparts: ["morning", "late"], episodes: ["Ziterella", "Old Best Friend", "Moose in Love"] }
        ]
      },
      "2004": {
        shows: [
          { title: "House of Mouse", category: "animation", dayparts: ["morning", "prime"], episodes: ["House of Scrooge", "Pete's House of Villains", "Clarabelle's Big Secret"] },
          { title: "Recess", category: "animation", dayparts: ["morning", "after-school"], episodes: ["The Experiment", "The Ratings Game", "Schoolworld"] },
          { title: "Kim Possible", category: "animation", dayparts: ["after-school", "prime"], episodes: ["Blush", "A Very Possible Christmas", "Partners"] },
          { title: "Fillmore!", category: "animation", dayparts: ["after-school", "prime", "late"], episodes: ["To Mar a Stall", "A Wurm in Our Midst", "Field Trip of the Just"] },
          { title: "The Weekenders", category: "animation", dayparts: ["morning", "after-school"], episodes: ["Crush Test Dummies", "Makeover", "Best"] }
        ]
      }
    }
  },
  {
    id: "nick",
    number: 24,
    name: "Nickelodeon",
    tagline: "Orange splats and after-school chaos.",
    accent: "#ff9f1c",
    description: "Cartoons, live-action comedy and the kind of lineup you leave running all afternoon.",
    defaultEra: "2005",
    eras: {
      "2003": {
        shows: [
          { title: "SpongeBob SquarePants", category: "animation", dayparts: ["morning", "after-school", "prime"], episodes: ["Chocolate with Nuts", "The Camping Episode", "Wet Painters", "Krusty Krab Training Video"] },
          { title: "The Fairly OddParents", category: "animation", dayparts: ["morning", "after-school", "prime"], episodes: ["Information Stupor Highway", "Pipe Down!", "The Big Scoop"] },
          { title: "Rugrats", category: "animation", dayparts: ["morning"], episodes: ["Angelica Orders Out", "The Word of the Day", "Finsterella"] },
          { title: "Drake & Josh", category: "sitcom", dayparts: ["after-school", "prime"], episodes: ["Pilot", "Dune Buggy", "Believe Me, Brother"] }
        ]
      },
      "2005": {
        shows: [
          { title: "SpongeBob SquarePants", category: "animation", dayparts: ["morning", "after-school", "prime", "late"], episodes: ["Fear of a Krabby Patty", "Shell of a Man", "The Lost Mattress", "Krabs vs. Plankton"] },
          { title: "Avatar: The Last Airbender", category: "action", dayparts: ["after-school", "prime"], episodes: ["The Boy in the Iceberg", "The Avatar Returns", "The Southern Air Temple", "The Warriors of Kyoshi"] },
          { title: "Danny Phantom", category: "action-comedy", dayparts: ["after-school", "prime"], episodes: ["Mystery Meat", "Parental Bonding", "One of a Kind", "Attack of the Killer Garage Sale"] },
          { title: "Drake & Josh", category: "sitcom", dayparts: ["after-school", "prime", "late"], episodes: ["The Bet", "Movie Job", "Football", "Pool Shark"] },
          { title: "Ned's Declassified School Survival Guide", category: "sitcom", dayparts: ["after-school", "prime"], episodes: ["Teachers & Detention", "Pep Rallies & Lunch", "Day Dreaming & Gym"] }
        ]
      }
    }
  },
  {
    id: "cartoon-network",
    number: 25,
    name: "Cartoon Network",
    tagline: "Cartoons, action blocks and late-night weirdness.",
    accent: "#f5f5f5",
    description: "A mixed lineup of comedy cartoons, action shows and older reruns.",
    defaultEra: "2005",
    eras: {
      "2003": {
        shows: [
          { title: "Ed, Edd n Eddy", category: "animation", dayparts: ["morning", "after-school", "prime"], episodes: ["An Ed in the Bush", "See No Ed", "Is There an Ed in the House?"] },
          { title: "The Powerpuff Girls", category: "animation", dayparts: ["morning", "after-school"], episodes: ["Monstra-City", "Shut the Pup Up", "Toast of the Town"] },
          { title: "Teen Titans", category: "action", dayparts: ["after-school", "prime"], episodes: ["Final Exam", "Sisters", "Divide and Conquer", "Forces of Nature"] },
          { title: "Codename: Kids Next Door", category: "animation", dayparts: ["morning", "after-school", "prime"], episodes: ["Operation: I.-S.C.R.E.A.M.", "Operation: C.A.N.N.O.N.", "Operation: T.U.R.N.I.P."] }
        ]
      },
      "2005": {
        shows: [
          { title: "Teen Titans", category: "action", dayparts: ["after-school", "prime"], episodes: ["Episode 257-494", "X", "Haunted", "Spellbound"] },
          { title: "Foster's Home for Imaginary Friends", category: "animation", dayparts: ["morning", "after-school", "prime"], episodes: ["Store Wars", "Bloooo", "Busted", "Dinner Is Swerved"] },
          { title: "The Grim Adventures of Billy & Mandy", category: "animation", dayparts: ["morning", "after-school", "late"], episodes: ["Billy and Mandy Save Christmas", "The Secret Snake Club", "Wishbones"] },
          { title: "Codename: Kids Next Door", category: "animation", dayparts: ["morning", "after-school"], episodes: ["Operation: A.R.C.H.I.V.E.", "Operation: C.A.K.E.D.-T.W.O.", "Operation: S.P.R.O.U.T."] },
          { title: "Justice League Unlimited", category: "action", dayparts: ["prime", "late"], episodes: ["The Cat and the Canary", "The Ties That Bind", "The Doomsday Sanction"] }
        ]
      }
    }
  }
];
