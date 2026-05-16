/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Question {
  id: string;
  type: 'text-selection' | 'input-correction' | 'multiple-choice';
  prompt: string;
  context?: string;
  correctAnswer: string;
  explanation: string;
  options?: string[];
}

export interface Game {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

export const curriculumData: Game[] = [
  {
    id: 'linguistic-categories',
    title: 'تحدي الأصناف اللغوية',
    description: 'حددي نوع الجملة، أسماء الإشارة، أو الأساليب اللغوية.',
    questions: [
      {
        id: 'lc-1',
        type: 'multiple-choice',
        prompt: 'ما نوع الجملة: "الرياضُ عاصمةُ المملكةِ العربيةِ السعوديةِ"؟',
        correctAnswer: 'جملة اسمية',
        explanation: 'هذه جملة اسمية لأنها بدأت باسم (الرياض).',
        options: ['جملة اسمية', 'جملة فعلية']
      },
      {
        id: 'lc-2',
        type: 'multiple-choice',
        prompt: 'أكملي باسم إشارة معرب مناسب: "سلمتُ على ........ الرجلينِ".',
        correctAnswer: 'هذينِ',
        explanation: 'نختار "هذين" لأنه اسم إشارة معرب في حالة جر بالياء (للمثنى المذكر).',
        options: ['هذانِ', 'هذينِ', 'ذلك']
      },
      {
        id: 'lc-3',
        type: 'multiple-choice',
        prompt: 'حددي الجملة التي اشتملت على اسم إشارة للمكان المتوسط:',
        correctAnswer: 'هناك نشأ أجدادي',
        explanation: '"هناك" تستخدم للإشارة للمكان المتوسط البعد، بينما "هنا" للقريب و "هنالك" للبعيد.',
        options: ['هنا نشأ أجدادي', 'هناك نشأ أجدادي', 'هنالك نشأ أجدادي']
      },
      {
        id: 'lc-4',
        type: 'multiple-choice',
        prompt: 'ما نوع الجملة: "الماءُ النقيُّ مركبٌ من اتحادِ غازينِ"؟',
        correctAnswer: 'جملة مثبتة',
        explanation: 'الجملة مثبتة لأنها لم تسبق بأي أداة نفي.',
        options: ['جملة مثبتة', 'جملة منفية']
      },
      {
        id: 'lc-5',
        type: 'multiple-choice',
        prompt: 'حولي الجملة المنفية "ليس الجوُّ غائماً" إلى جملة مثبتة:',
        correctAnswer: 'إن الجوَّ غائمٌ',
        explanation: 'عند الإثبات نستخدم "إنّ" للتوكيد ونرفع الخبر، فتصبح "إن الجوَّ غائمٌ".',
        options: ['إن الجوَّ غائمٌ', 'إني الجو غانماً', 'ما الجو غائم']
      },
      {
        id: 'lc-6',
        type: 'multiple-choice',
        prompt: 'أي جملة مما يلي تعتبر "خبرية منفية"؟',
        correctAnswer: 'ما أنت بمسمع من في القبور',
        explanation: 'جملة "وما أنت بمسمع" بدأت بأداة النفي (ما).',
        options: ['بمسمع من في القبور', 'ما أنت بمسمع من في القبور', 'أنت مسمع من في القبور']
      }
    ]
  },
  {
    id: 'spelling-hunter',
    title: 'صائدة الأخطاء الإملائية',
    description: 'اكتشفي الخطأ وصححيه (الهمزة المتوسطة، التاءات، وعلامات الترقيم).',
    questions: [
      {
        id: 'sh-1',
        type: 'input-correction',
        prompt: 'عند وصل الحروف "ن-ش-أ-ة" تُكتب الكلمة:',
        correctAnswer: 'نشأة',
        explanation: 'تكتب الهمزة على الألف لأنها مفتوحة وما قبلها ساكن.',
      },
      {
        id: 'sh-2',
        type: 'multiple-choice',
        prompt: 'لماذا كُتبت الهمزة على الألف في كلمة "الفأل"؟',
        correctAnswer: 'ساكنة وما قبلها مفتوح',
        explanation: 'القاعدة تقول إذا كانت الهمزة ساكنة وما قبلها مفتوح تُرسم على الألف.',
        options: ['مفتوحة وما قبلها مفتوح', 'ساكنة وما قبلها مفتوح', 'مفتوحة وما قبلها ساكن']
      },
      {
        id: 'sh-3',
        type: 'multiple-choice',
        prompt: 'اختاري علامات الترقيم المناسبة: "يا خالد ( ) اعلم أن العلم نور ( )"',
        correctAnswer: '(،) و (.)',
        explanation: 'نضع الفاصلة بعد المنادى (يا خالد) والنقطة في نهاية الجملة التامة.',
        options: ['(؟) و (.)', '(،) و (!)', '(،) و (.)']
      },
      {
        id: 'sh-4',
        type: 'input-correction',
        prompt: 'صلي الحروف التالية لتكوين كلمة صحيحة: "ف-ؤ-ا-د"',
        correctAnswer: 'فؤاد',
        explanation: 'تكتب الهمزة على الواو لأن الهمزة مفتوحة وما قبلها مضموم، والضمة أقوى من الفتحة.',
      },
      {
        id: 'sh-5',
        type: 'input-correction',
        prompt: 'صلي الحروف التالية لتكوين كلمة صحيحة: "ي-ت-أ-ل-ف"',
        correctAnswer: 'يتألف',
        explanation: 'تكتب الهمزة على الألف لأنها مفتوحة وما قبلها مفتوح.',
      },
      {
        id: 'sh-6',
        type: 'multiple-choice',
        prompt: 'ما سبب كتابة التاء مفتوحة في الكلمات (ثبت، يثبت، أثبت)؟',
        correctAnswer: 'لأنها تاء أصلية',
        explanation: 'التاء في هذه الأفعال جزء من أصل الكلمة فتكتب تاء مفتوحة.',
        options: ['لأنها تاء أصلية', 'لأنها تاء التأنيث', 'لأنها جمع مؤنث سالم']
      }
    ]
  },
  {
    id: 'meanings-syntax',
    title: 'لغز المعاني والإعراب',
    description: 'أسرار الحروف الناسخة، المضاف إليه، وعلامات الإعراب.',
    questions: [
      {
        id: 'ms-1',
        type: 'multiple-choice',
        prompt: 'ما المعنى الذي يفيده الحرف الناسخ (ليت)؟',
        correctAnswer: 'التمني',
        explanation: 'ليت حرف ناسخ يفيد التمني (طلب شيء يصعب تحقيقه).',
        options: ['التمني', 'الترجي', 'التوكيد']
      },
      {
        id: 'ms-2',
        type: 'multiple-choice',
        prompt: 'ما الموقع الإعرابي للاسم الذي يأتي بعد الحروف الناسخة (إن وأخواتها)؟',
        correctAnswer: 'اسمها المنصوب',
        explanation: 'الحروف الناسخة تنصب المبتدأ ويسمى (اسمها) وترفع الخبر ويسمى (خبرها).',
        options: ['اسمها المنصوب', 'خبرها المرفوع', 'فاعل مرفوع']
      },
      {
        id: 'ms-3',
        type: 'multiple-choice',
        prompt: 'في جملة "استمع إلى نصيحة ......"، الكلمة الصحيحة هي:',
        correctAnswer: 'أبيك',
        explanation: 'نختار "أبيك" لأنها مضاف إليه مجرور بالياء (من الأسماء الخمسة).',
        options: ['أبوك', 'أباك', 'أبيك']
      },
      {
        id: 'ms-4',
        type: 'multiple-choice',
        prompt: 'ما علامةُ جر المضاف إليه في جملة "مكةُ أمُّ القرى"؟',
        correctAnswer: 'الكسرة المقدرة',
        explanation: 'كلمة القرى مضاف إليه مجرور وعلامة جره الكسرة المقدرة للتعذر.',
        options: ['الكسرة الظاهرة', 'الكسرة المقدرة', 'الياء']
      },
      {
        id: 'ms-5',
        type: 'multiple-choice',
        prompt: 'المضافُ دائماً يكون:',
        correctAnswer: 'نكرة',
        explanation: 'المضاف يكون نكرة ويتم تعريفه أو تخصيصه بواسطة المضاف إليه.',
        options: ['نكرة', 'معرفة', 'نكرة أو معرفة']
      },
      {
        id: 'ms-6',
        type: 'multiple-choice',
        prompt: 'ما علامة جر المضاف إليه في جملة "حماية لأرواح المسافرين"؟',
        correctAnswer: 'الياء',
        explanation: '"المسافرين" مضاف إليه مجرور بالياء لأنه جمع مذكر سالم.',
        options: ['الكسرة', 'الياء', 'الفتحة']
      }
    ]
  }
];

export const encouragementPhrases = [
  "أحسنتِ يا بطلة! 🌟",
  "كفو والله! ذكاؤكِ باهر 💡",
  "بيض الله وجهكِ، إجابة سديدة ✅",
  "ما شاء الله عليكِ، استمري في التميز 🚀",
  "أنتِ فخر للغتنا العربية! 🇸🇦"
];

export const retryPhrases = [
  "حاولي مرة أخرى يا ذكية، أنتِ قريبة من الإجابة! 🧠",
  "الخطأ معلم جيد، ركزي وحاولي مجدداً 💪",
  "لا بأس، العباقرة يتعلمون من أخطائهم 🍎"
];
