import usePresentation from "../hooks/usePresentation";
import "./layout.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { slide, slides } = usePresentation();
  return (
    <div
      className="
        container
        mx-8
        mt-8
        box-border
        flex
        h-[calc(100vh-2rem)]
        w-[calc(100vw-4rem)]
        flex-col
        justify-between
        rounded-lg
        bg-base
        px-8
        pt-8
        font-roboto
        text-text"
    >
      <div className="flex h-full flex-col items-center justify-center space-y-8">
        {children}
      </div>
      <div className="flex flex-col items-center justify-center">
        Slide {slide + 1}/{slides.length}
        <progress
          className="
            [&::-webkit-progress-bar]:bg-overlay
            h-1
            w-full
            [&::-moz-progress-bar]:bg-mauve
            [&::-webkit-progress-bar]:rounded-lg
            [&::-webkit-progress-value]:rounded-lg
            [&::-webkit-progress-value]:bg-mauve"
          max={slides.length - 1}
          value={slide}
        />
      </div>
    </div>
  );
}
