import IconBaseAvatar1 from "@/assets/icons/baseAvatar/avatar/1.svg";
import IconBaseAvatar2 from "@/assets/icons/baseAvatar/avatar/2.svg";
import IconBaseAvatar3 from "@/assets/icons/baseAvatar/avatar/3.svg";
import Gerland from "./ui/Gerland";
interface AvatarProps {
  srcImage?: string;
  className?: string;
  typeBaseAvatar?: number;
  typeRank?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
}

export const Avatar: React.FC<AvatarProps> = ({
  srcImage = "",
  className,
  typeBaseAvatar = 1,
  typeRank = 1,
}) => {
  return (
    <>
      <div className="relative">
        <div className={className}>{<IconBaseAvatar1 />}</div>
        <Gerland
          className="absolute bottom-[-7px] -translate-x-[1px]"
          rank={typeRank}
        />
      </div>
    </>
  );
};
