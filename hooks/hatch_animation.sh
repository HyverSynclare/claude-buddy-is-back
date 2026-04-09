#!/bin/bash
# Hatching egg animation for terminal
# Usage: ./hatch_animation.sh [companion_name]

NAME="${1:-Buddy}"

YELLOW="\033[38;2;255;212;59m"
CYAN="\033[38;2;125;207;255m"
DIM="\033[38;2;86;95;137m"
BOLD="\033[1m"
RESET="\033[0m"

rainbow() {
  local text="$1"
  local colors=(
    "\033[38;2;255;107;107m" "\033[38;2;255;169;77m" "\033[38;2;255;212;59m"
    "\033[38;2;105;219;124m" "\033[38;2;77;171;247m" "\033[38;2;121;80;242m"
    "\033[38;2;204;93;232m"
  )
  local len=${#text}
  for (( i=0; i<len; i++ )); do
    printf "${colors[$((i % ${#colors[@]}))]]}%s" "${text:$i:1}"
  done
  printf "${RESET}"
}

clear_lines() {
  for (( i=0; i<$1; i++ )); do printf "\033[A\033[2K"; done
}

EGG_LINES=6
for cycle in 1 2 3; do
  for offset in "     " "      " "       " "      "; do
    printf "${YELLOW}"
    printf "${offset}_____\n${offset}/     \\\\\n${offset}/       \\\\\n"
    printf "${offset}|         |\n${offset}\\\\       /\n${offset}\\\\_____/\n"
    printf "${RESET}"
    sleep 0.15
    clear_lines $EGG_LINES
  done
done

printf "${YELLOW}      _____\n     / * * \\\\\n    /  / \\\\  \\\\\n"
printf "   |  /   \\\\  |\n    \\\\ /    \\\\//\n     \\\\_____/\n${RESET}"
sleep 0.5
clear_lines $EGG_LINES

printf "\n${CYAN}${BOLD}  ✨ "
rainbow "$NAME"
printf "${CYAN}${BOLD} ✨\n${RESET}\n"
printf "${DIM}  *blinzelt zum ersten Mal*${RESET}\n\n"
