import { motion } from "framer-motion";
import { Folder, File, FolderOpen, ChevronRight } from "lucide-react";
import { useState } from "react";

interface TreeNode {
  name: string;
  type: "folder" | "file";
  children?: TreeNode[];
  highlight?: boolean;
  icon?: string;
}

interface DirectoryTreeProps {
  data: TreeNode[];
  className?: string;
  showAnimation?: boolean;
  highlightedPaths?: string[];
}

const TreeItem = ({
  node,
  depth = 0,
  delay = 0,
  showAnimation = true,
}: {
  node: TreeNode;
  depth?: number;
  delay?: number;
  showAnimation?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const isFolder = node.type === "folder";
  const hasChildren = node.children && node.children.length > 0;

  return (
    <motion.div
      initial={showAnimation ? { opacity: 0, x: -10 } : false}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: delay * 0.1 }}
    >
      <div
        className={`flex items-center gap-2 py-1 px-2 rounded-md cursor-pointer transition-all duration-200 hover:bg-muted/50 ${
          node.highlight ? "bg-primary/10 border-l-2 border-primary" : ""
        }`}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        onClick={() => isFolder && setIsOpen(!isOpen)}
      >
        {isFolder && hasChildren && (
          <ChevronRight
            className={`w-3 h-3 text-muted-foreground transition-transform ${
              isOpen ? "rotate-90" : ""
            }`}
          />
        )}
        {isFolder ? (
          isOpen ? (
            <FolderOpen className="w-4 h-4 text-primary" />
          ) : (
            <Folder className="w-4 h-4 text-primary" />
          )
        ) : (
          <File className="w-4 h-4 text-muted-foreground" />
        )}
        <span
          className={`text-sm ${
            node.highlight ? "text-primary font-medium" : "text-foreground"
          }`}
        >
          {node.name}
        </span>
        {node.highlight && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-2 h-2 rounded-full bg-success ml-auto"
          />
        )}
      </div>
      {isFolder && isOpen && hasChildren && (
        <div>
          {node.children!.map((child, index) => (
            <TreeItem
              key={child.name}
              node={child}
              depth={depth + 1}
              delay={delay + index + 1}
              showAnimation={showAnimation}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

const DirectoryTree = ({
  data,
  className = "",
  showAnimation = true,
}: DirectoryTreeProps) => {
  return (
    <div className={`font-mono text-sm ${className}`}>
      {data.map((node, index) => (
        <TreeItem
          key={node.name}
          node={node}
          delay={index}
          showAnimation={showAnimation}
        />
      ))}
    </div>
  );
};

export default DirectoryTree;
