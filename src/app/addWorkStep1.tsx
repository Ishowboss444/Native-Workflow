import { Fragment, useState } from "react";
import type { ReactNode } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import type { TextInputProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { ChevronLeft, X } from "lucide-react-native";
import { usePartsStore } from "@/stores/useParts";
import { palette, fonts } from "@/constants/tokens";

const STEPS = ["۱", "۲", "۳", "۴"];

//date format
const toISODate = (d: Date) => {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
};

const fromISODate = (s: string) => {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
};

const isFilled = (v: string) => v.trim().length > 0;

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      {children}
    </View>
  );
}

// input / textarea with the focus ability
function FormInput({ style, multiline, onFocus, onBlur, ...props }: TextInputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <TextInput
      {...props}
      multiline={multiline}
      selectionColor={palette.accentBg}
      onFocus={(e) => {
        setFocused(true);
        onFocus?.(e);
      }}
      onBlur={(e) => {
        setFocused(false);
        onBlur?.(e);
      }}
      style={[
        styles.input,
        multiline ? styles.textarea : styles.singleLine,
        focused && styles.inputFocused,
        style,
      ]}
    />
  );
}

export default function AddWorkStep1() {
  const router = useRouter();
  const general = usePartsStore((s) => s.newPart.general);
  const setGeneral = usePartsStore((s) => s.setGeneral);
  const [showPicker, setShowPicker] = useState(false);

  function approvalNext() {
    const { code, title, allCount, deadline } = general;

    if (isFilled(code) && isFilled(title) && isFilled(allCount)) {
      router.push("/");
    } else {
      Alert.alert("لطفاً همه فیلدهای الزامی را پر کنید");
    }
  }

  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          {/* .head */}
          <View style={styles.head}>
            <Pressable onPress={() => router.back()} hitSlop={12} style={styles.headBack}>
              <X size={24} color={palette.textPrimary} />
            </Pressable>
            <View style={styles.headTitle}>
              <Text style={styles.step}>مرحله ۱ از ۴</Text>
              <Text style={styles.title}>افزودن کار جدید</Text>
            </View>
          </View>

          {/* .steps */}
          <View style={styles.steps}>
            {STEPS.map((n, i) => (
              <Fragment key={n}>
                {i > 0 && <View style={styles.stepLine} />}
                <View style={[styles.stepDot, i === 0 && styles.stepDotDone]}>
                  <Text style={[styles.stepText, i === 0 && styles.stepTextDone]}>{n}</Text>
                </View>
              </Fragment>
            ))}
          </View>

          {/* .form */}
          <View style={styles.form}>
            <Field label="کد پارت">
              <FormInput
                value={general.code}
                onChangeText={(code) => setGeneral({ code })}
              />
            </Field>

            <Field label="نوع کار">
              <FormInput
                value={general.title}
                onChangeText={(title) => setGeneral({ title })}
              />
            </Field>

            <Field label="توضیحات (اختیاری)">
              <FormInput
                multiline
                value={general.description}
                onChangeText={(description) => setGeneral({ description })}
              />
            </Field>

            <Field label="تعداد کل">
              <FormInput
                keyboardType="numeric"
                value={general.allCount}
                onChangeText={(allCount) => setGeneral({ allCount })}
              />
            </Field>

            <Field label="ددلاین تحویل">
              <Pressable
                style={[styles.input, styles.singleLine]}
                onPress={() => setShowPicker(true)}
              >
                <Text style={general.deadline ? styles.dateText : styles.datePlaceholder}>
                  {general.deadline || "انتخاب تاریخ"}
                </Text>
              </Pressable>

              {showPicker && (
                <DateTimePicker
                  value={general.deadline ? fromISODate(general.deadline) : new Date()}
                  mode="date"
                  display={Platform.OS === "ios" ? "inline" : "default"}
                  onChange={(event, selected) => {
                    setShowPicker(false);
                    if (event.type === "set" && selected) {
                      setGeneral({ deadline: toISODate(selected) });
                    }
                  }}
                />
              )}
            </Field>
          </View>

          {/* .button-section */}
          <View style={styles.buttonSection}>
            <Pressable
              onPress={approvalNext}
              style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
            >
              <Text style={styles.buttonText}>بعدی</Text>
              <ChevronLeft size={18} color={palette.accentText} />
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const text = {
  fontFamily: fonts.semibold,
  color: palette.textPrimary,
} as const;

const styles = StyleSheet.create({
  flex: { flex: 1 },

  // (2rem padding, bg-primary)
  root: { flex: 1, backgroundColor: palette.bgPrimary },
  content: { padding: 32, flexGrow: 1 },

  // .head
  head: { flexDirection: "row" },
  headBack: { justifyContent: "center" },
  headTitle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  step: { ...text, fontSize: 16 },
  title: { ...text, fontSize: 24 },

  // .steps
  steps: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  stepDot: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    backgroundColor: palette.bgThird,
    alignItems: "center",
    justifyContent: "center",
  },
  stepDotDone: { backgroundColor: palette.accentBg },
  stepText: { ...text, fontSize: 12 },
  stepTextDone: { color: palette.textEmphase },
  stepLine: {
    width: 24,
    height: 2,
    marginHorizontal: 3,
    backgroundColor: palette.borderPrimary,
  },

  // .form
  form: { marginTop: 30 },
  field: { gap: 5, paddingTop: 10 },
  label: { ...text, fontSize: 16 },
  input: {
    borderWidth: 1,
    borderColor: palette.borderPrimary,
    borderRadius: 10,
    paddingStart: 15,
    paddingEnd: 15,
    backgroundColor: "#ffffff",
    fontFamily: fonts.semibold,
    fontSize: 14,
    color: palette.textPrimary,
  },
  inputFocused: { borderColor: palette.accentBg },
  singleLine: { height: 40, paddingVertical: 0, justifyContent: "center" },
  // textarea
  textarea: { minHeight: 40, paddingVertical: 10, textAlignVertical: "top" },
  dateText: { ...text, fontSize: 14 },
  datePlaceholder: { ...text, fontSize: 14, color: palette.textSecondary },

  // .button-section 
  buttonSection: { marginTop: 30 },
  button: {
    height: 40,
    borderRadius: 14,
    backgroundColor: palette.accentBg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    overflow: "hidden",
  },
  buttonPressed: { opacity: 0.85 },
  buttonText: { ...text, fontSize: 14, color: palette.accentText },
});