import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { FileText, Video, Image, MessageSquare, Code, Settings, Search, GitBranch, CheckCircle, ArrowRight } from "lucide-react";
import DirectoryTree from "./DirectoryTree";
import openVikingLogo from "@/assets/openviking-logo.png";
const FeatureCard1 = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px"
  });
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    let isCancelled = false;
    const runAnimation = () => {
      if (isCancelled) return;

      // Reset to phase 0
      setPhase(0);

      // Phase 1: Chaos icons appear and float (500ms delay)
      const timer1 = setTimeout(() => {
        if (!isCancelled) setPhase(1);
      }, 500);

      // Phase 2: Processing animation starts (3000ms - icons still visible)
      const timer2 = setTimeout(() => {
        if (!isCancelled) setPhase(2);
      }, 3000);

      // Phase 3: Directory tree expands, icons disappear (4500ms)
      const timer3 = setTimeout(() => {
        if (!isCancelled) setPhase(3);
      }, 4500);

      // Hold final state for 3 seconds, then loop (7500ms total = 4500 + 3000)
      const loopTimer = setTimeout(() => {
        if (!isCancelled) runAnimation();
      }, 7500);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(loopTimer);
      };
    };
    const cleanup = runAnimation();
    return () => {
      isCancelled = true;
      if (cleanup) cleanup();
    };
  }, [isInView]);
  const chaosIcons = [{
    Icon: FileText,
    label: "PDF",
    color: "text-red-400",
    delay: 0
  }, {
    Icon: Video,
    label: "Video",
    color: "text-blue-400",
    delay: 0.1
  }, {
    Icon: Image,
    label: "Image",
    color: "text-green-400",
    delay: 0.2
  }, {
    Icon: MessageSquare,
    label: "Chat",
    color: "text-yellow-400",
    delay: 0.3
  }, {
    Icon: Code,
    label: "Code",
    color: "text-purple-400",
    delay: 0.4
  }, {
    Icon: Settings,
    label: "Config",
    color: "text-orange-400",
    delay: 0.5
  }];

  // Dynamic tree data that expands when phase >= 3
  const getTreeData = () => {
    if (phase < 3) {
      return [{
        name: "Resources/",
        type: "folder" as const,
        children: []
      }, {
        name: "Memories/",
        type: "folder" as const,
        children: []
      }, {
        name: "Skills/",
        type: "folder" as const,
        children: []
      }];
    }
    return [{
      name: "Resources/",
      type: "folder" as const,
      highlight: true,
      children: [{
        name: "processed_doc.md",
        type: "file" as const,
        highlight: true
      }, {
        name: "video_transcript.txt",
        type: "file" as const,
        highlight: true
      }]
    }, {
      name: "Memories/",
      type: "folder" as const,
      highlight: true,
      children: [{
        name: "session_log.json",
        type: "file" as const,
        highlight: true
      }]
    }, {
      name: "Skills/",
      type: "folder" as const,
      highlight: true,
      children: [{
        name: "tool_def.yaml",
        type: "file" as const,
        highlight: true
      }]
    }];
  };
  return null;
};
const FeatureCard2 = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px"
  });
  const [phase, setPhase] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [highlightPath, setHighlightPath] = useState<string[]>([]);
  useEffect(() => {
    if (!isInView) return;
    let isCancelled = false;
    const runAnimation = () => {
      if (isCancelled) return;

      // Reset state
      setPhase(0);
      setSearchText("");
      setHighlightPath([]);
      const fullText = "How does auth handle errors?";
      let i = 0;
      const typeTimer = setInterval(() => {
        if (isCancelled) {
          clearInterval(typeTimer);
          return;
        }
        if (i <= fullText.length) {
          setSearchText(fullText.slice(0, i));
          i++;
        } else {
          clearInterval(typeTimer);
          // Phase 1: Cursor scanning around
          if (!isCancelled) setPhase(1);

          // Phase 2: Locate Resources/ and drill to error_handler.pdf
          setTimeout(() => {
            if (!isCancelled) {
              setPhase(2);
              setHighlightPath(["Resources/", "references/", "error_handler.pdf"]);
            }
          }, 800);

          // Phase 3: Locate Skills/ and select validator.py
          setTimeout(() => {
            if (!isCancelled) {
              setPhase(3);
              setHighlightPath(["Resources/", "references/", "error_handler.pdf", "Skills/", "validator.py"]);
            }
          }, 1600);

          // Phase 4: Locate Memories/ and select Experience in Error Handling
          setTimeout(() => {
            if (!isCancelled) {
              setPhase(4);
              setHighlightPath(["Resources/", "references/", "error_handler.pdf", "Skills/", "validator.py", "Memories/", "Experience in Error Handling"]);
            }
          }, 2400);

          // Phase 5: Context retrieved
          setTimeout(() => {
            if (!isCancelled) setPhase(5);
          }, 3200);

          // Hold for 3 seconds, then loop
          setTimeout(() => {
            if (!isCancelled) runAnimation();
          }, 6200);
        }
      }, 50);
      return () => clearInterval(typeTimer);
    };
    const cleanup = runAnimation();
    return () => {
      isCancelled = true;
      if (cleanup) cleanup();
    };
  }, [isInView]);

  // Directory structure per user spec
  const getTreeData = () => {
    const isPathHighlighted = (path: string) => highlightPath.includes(path);
    return [{
      name: "Resources/",
      type: "folder" as const,
      highlight: isPathHighlighted("Resources/"),
      children: [{
        name: "references/",
        type: "folder" as const,
        highlight: isPathHighlighted("references/"),
        children: [{
          name: "error_handler.pdf",
          type: "file" as const,
          highlight: isPathHighlighted("error_handler.pdf")
        }, {
          name: "best_practice.pdf",
          type: "file" as const
        }]
      }]
    }, {
      name: "Skills/",
      type: "folder" as const,
      highlight: isPathHighlighted("Skills/"),
      children: [{
        name: "validator.py",
        type: "file" as const,
        highlight: isPathHighlighted("validator.py")
      }, {
        name: "test.py",
        type: "file" as const
      }]
    }, {
      name: "Memories/",
      type: "folder" as const,
      highlight: isPathHighlighted("Memories/"),
      children: [{
        name: "Experience in Error Handling",
        type: "file" as const,
        highlight: isPathHighlighted("Experience in Error Handling")
      }, {
        name: "Coding Standards",
        type: "file" as const
      }]
    }];
  };
  return null;
};
const FeatureCard3 = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px"
  });
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    let isCancelled = false;
    const runAnimation = () => {
      if (isCancelled) return;

      // Reset state
      setPhase(0);

      // Phase 1: Session submitting (arrow animates down)
      setTimeout(() => {
        if (!isCancelled) setPhase(1);
      }, 500);

      // Phase 2: OpenViking processing
      setTimeout(() => {
        if (!isCancelled) setPhase(2);
      }, 1500);

      // Phase 3: Memory updates appear
      setTimeout(() => {
        if (!isCancelled) setPhase(3);
      }, 3000);

      // Hold for 3 seconds, then loop
      setTimeout(() => {
        if (!isCancelled) runAnimation();
      }, 6000);
    };
    runAnimation();
    return () => {
      isCancelled = true;
    };
  }, [isInView]);
  return null;
};
const FeatureCards = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <FeatureCard1 />
      <FeatureCard2 />
      <FeatureCard3 />
    </div>
  );
};
export default FeatureCards;