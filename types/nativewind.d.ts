import "nativewind/types";
import {
  ViewProps,
  TextProps,
  ImageProps,
  ScrollViewProps,
  TextInputProps,
  TouchableOpacityProps,
  TouchableHighlightProps,
  TouchableWithoutFeedbackProps,
  PressableProps,
  SafeAreaViewProps,
  FlatListProps,
  SectionListProps,
  ActivityIndicatorProps,
  ModalProps,
  SwitchProps,
  ButtonProps,
  PickerProps,
  SliderProps,
  RefreshControlProps,
  StatusBarProps,
  KeyboardAvoidingViewProps,
} from "react-native";

declare module "react-native" {
  interface ViewProps {
    className?: string;
  }
  interface TextProps {
    className?: string;
  }
  interface ImageProps {
    className?: string;
  }
  interface ScrollViewProps {
    className?: string;
  }
  interface TextInputProps {
    className?: string;
  }
  interface TouchableOpacityProps {
    className?: string;
  }
  interface TouchableHighlightProps {
    className?: string;
  }
  interface TouchableWithoutFeedbackProps {
    className?: string;
  }
  interface PressableProps {
    className?: string;
  }
  interface SafeAreaViewProps {
    className?: string;
  }
  interface FlatListProps<ItemT> {
    className?: string;
  }
  interface SectionListProps<ItemT> {
    className?: string;
  }
  interface ActivityIndicatorProps {
    className?: string;
  }
  interface ModalProps {
    className?: string;
  }
  interface SwitchProps {
    className?: string;
  }
  interface ButtonProps {
    className?: string;
  }
  interface PickerProps<ItemT> {
    className?: string;
  }
  interface SliderProps {
    className?: string;
  }
  interface RefreshControlProps {
    className?: string;
  }
  interface StatusBarProps {
    className?: string;
  }
  interface KeyboardAvoidingViewProps {
    className?: string;
  }
  // Add more components if necessary
}
