import { useState, useCallback, useMemo } from "react";

import { truncateText } from "../utils/helpers";

const useTextExpand = (type, originalText) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = useCallback(() => setIsExpanded(!isExpanded), [
    isExpanded,
  ]);

  const truncatedText = useMemo(() => truncateText(type, originalText), [
    type,
    originalText,
  ]);

  let showToggle;
  let content;

  if (truncatedText.length === originalText.length) {
    showToggle = false;
    content = originalText;
  } else {
    showToggle = true;
    content = isExpanded ? originalText : truncatedText;
  }

  return {
    showToggle,
    handleToggle,
    content,
    isExpanded,
  };
};

export default useTextExpand;
