path = "C:/woohee_dev/404_ai_agent_lecture/lecture/index.html"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

old8 = "practice: 'Discord MCP\ub97c \uae30\ubc18\uc73c\ub85c check_my_mention \uc2a4\ud0ac\uacfc send_with_mention \uc2a4\ud0ac\uc744 \uc9c1\uc811 \uc81c\uc791\ud558\uace0 \ubcf4\ud2b8\ub07c\ub9ac \uba58\uc158 \ub300\ud654\ub97c \uc644\uc131\ud55c\ub2e4.' }"
new8 = "practice: 'Discord MCP\ub97c \uae30\ubc18\uc73c\ub85c check_my_mention \uc2a4\ud0ac\uacfc send_with_mention \uc2a4\ud0ac\uc744 \uc9c1\uc811 \uc81c\uc791\ud558\uace0 \ubcf4\ud2b8\ub07c\ub9ac \uba58\uc158 \ub300\ud654\ub97c \uc644\uc131\ud55c\ub2e4.', action: { label: 'Claude\uc5d0\uac8c \ubd99\uc5ec\ub123\uae30', copy: '.claude/skills/send-mention/SKILL.md \ud30c\uc77c\uc744 \ub9cc\ub4e4\uc5b4\uc918. description: \"\ud2b9\uc815 \ubcf4\uc744 @\uba58\uc158\ud558\uc5ec \uba54\uc2dc\uc9c0\ub97c \ubcf4\ub0c5\ub2c8\ub2e4\". Discord API\ub85c CHANNEL_ID\uc5d0 <@MENTION_USER_ID> \ud615\uc2dd\uc73c\ub85c \uba54\uc2dc\uc9c0 \uc804\uc1a1. BOT_TOKEN, CHANNEL_ID, MENTION_USER_ID\ub294 \ud658\uacbd\ubcc0\uc218\ub85c \uad00\ub9ac\ud558\ub294 \ub0b4\uc6a9\uc73c\ub85c.' } }"

if old8 in content:
    content = content.replace(old8, new8, 1)
    print("8. send_with_mention OK")
else:
    print("NOT FOUND - trying raw search")
    idx = content.find("send_with_mention")
    print(repr(content[idx:idx+20]))

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print("DONE")
