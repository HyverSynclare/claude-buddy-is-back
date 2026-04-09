#!/bin/bash
# Rainbow text output for terminal
# Usage: ./rainbow.sh "text to rainbow"

TEXT="${1:-/buddy}"

COLORS=(
  "\033[38;2;255;107;107m"
  "\033[38;2;255;169;77m"
  "\033[38;2;255;212;59m"
  "\033[38;2;105;219;124m"
  "\033[38;2;77;171;247m"
  "\033[38;2;121;80;242m"
  "\033[38;2;204;93;232m"
)
RESET="\033[0m"

len=${#TEXT}
for (( i=0; i<len; i++ )); do
  char="${TEXT:$i:1}"
  color_idx=$(( i % ${#COLORS[@]} ))
  printf "${COLORS[$color_idx]}%s" "$char"
done
printf "${RESET}\n"
