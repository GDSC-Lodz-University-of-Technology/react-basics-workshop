import { PresentationContext } from "../contexts/PresentationContext";
import useKeyPress from "../hooks/useKeyPress";
import Layout from "../slides/Layout";
import CodeBlock from "./CodeBlock";
import { Components } from "@mdx-js/react/lib";
import { Reducer, useEffect, useReducer } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const components: Components = {
  h1: ({ children }) => <h1 className="text-5xl">{children}</h1>,
  h2: ({ children }) => <h2 className="text-subtext text-3xl">{children}</h2>,
  code: ({ className, ...props }) => {
    const match = /language-(\w+)/.exec(className || "");
    return match ? (
      <CodeBlock language={match[0]} {...props} />
    ) : (
      <code className={className} {...props} />
    );
  },
  wrapper: Layout,
  Note: () => null,
};

const slidesToRoutes = (slides: PresentationContext["slides"]) => {
  return slides.map((slide, index) => {
    return {
      element: slide({ components }),
      slideIndex: index,
      path: `/${index}`,
    };
  });
};

type InitialPresentationContext = Pick<PresentationContext, "slides" | "slide">;

enum PresentationActionType {
  NextSlide = "nextSlide",
  PreviousSlide = "previousSlide",
  GoToSlide = "goToSlide",
}

interface NextSlideAction {
  type: PresentationActionType.NextSlide;
}

interface PreviousSlideAction {
  type: PresentationActionType.PreviousSlide;
}

interface GoToSlideAction {
  type: PresentationActionType.GoToSlide;
  payload: number;
}

type PresentationAction =
  | NextSlideAction
  | PreviousSlideAction
  | GoToSlideAction;

function isSlideRoute<T extends object>(
  route: T
): route is T & { slideIndex: number } {
  return "slideIndex" in route;
}

export default function Presentation({
  initialState: { slides, slide },
}: {
  initialState: InitialPresentationContext;
}) {
  const router = createBrowserRouter(slidesToRoutes(slides));

  const [state, dispatch] = useReducer<
    Reducer<InitialPresentationContext, PresentationAction>
  >(
    (state: InitialPresentationContext, action: PresentationAction) => {
      const { type } = action;
      switch (type) {
        case PresentationActionType.NextSlide:
          if (state.slide >= slides.length - 1) {
            return state;
          }
          router.navigate(`/${state.slide + 1}`);
          return { ...state, slide: state.slide + 1 };
        case PresentationActionType.PreviousSlide:
          if (state.slide <= 0) {
            return state;
          }
          router.navigate(`/${state.slide - 1}`);
          return { ...state, slide: state.slide - 1 };
        case PresentationActionType.GoToSlide:
          if (action.payload < 0 || action.payload >= slides.length) {
            return state;
          }
          router.navigate(`/${action.payload}`);
          return { ...state, slide: action.payload };
      }
      return state;
    },
    {
      slides,
      slide,
    }
  );

  const checkRoute: Parameters<(typeof router)["subscribe"]>[0] = ({
    matches,
  }) => {
    if (!isSlideRoute(matches[0].route)) {
      return;
    }
    if (matches[0].route.slideIndex === state.slide) {
      return;
    }
    dispatch({
      type: PresentationActionType.GoToSlide,
      payload: matches[0].route.slideIndex,
    });
  };

  useEffect(() => {
    router.subscribe(checkRoute);

    checkRoute(router.state);
  });

  useKeyPress("ArrowRight", () =>
    dispatch({ type: PresentationActionType.NextSlide })
  );
  useKeyPress("ArrowLeft", () =>
    dispatch({ type: PresentationActionType.PreviousSlide })
  );

  return (
    <PresentationContext.Provider
      value={{
        ...state,
        nextSlide: () => dispatch({ type: PresentationActionType.NextSlide }),
        previousSlide: () =>
          dispatch({ type: PresentationActionType.PreviousSlide }),
      }}
    >
      <RouterProvider router={router}></RouterProvider>
    </PresentationContext.Provider>
  );
}
