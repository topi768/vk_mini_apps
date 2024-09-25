import IconBaseAvatar1 from "@/assets/icons/baseAvatar/avatar/1.svg";
interface AvatarProps {
  srcImage?: string;
  className?: string;
  typeBaseAvatar?: number;
}

export const Avatar: React.FC<AvatarProps> = ({
  srcImage = "",
  className,
  typeBaseAvatar = 1,
}) => {
  return (
    <>
      <div className={className}>{<IconBaseAvatar1 />}</div>
    </>
  );
};
