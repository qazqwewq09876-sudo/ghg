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
    description: 'حدد نوع الجملة أو استخرج المبتدأ والخبر.',
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
        prompt: 'ما الموقع الإعرابي لكلمة "العلمُ" في "العلمُ نورٌ"؟',
        correctAnswer: 'مبتدأ',
        explanation: 'العلمُ مبتدأ لأنه الاسم الذي نبتدئ به الجملة الاسمية.',
        options: ['مبتدأ', 'خبر', 'فاعل']
      },
      {
        id: 'lc-3',
        type: 'multiple-choice',
        prompt: 'ما الموقع الإعرابي لكلمة "نورٌ" في "العلمُ نورٌ"؟',
        correctAnswer: 'خبر',
        explanation: 'نورٌ خبر لأنه هو الذي أخبرنا عن المبتدأ وأتم معنى الجملة.',
        options: ['مبتدأ', 'خبر', 'مفعول به']
      },
      {
        id: 'lc-4',
        type: 'multiple-choice',
        prompt: 'ما نوع الجملة: "يحافظُ المسلمُ على صلاتِهِ"؟',
        correctAnswer: 'جملة فعلية',
        explanation: 'هذه جملة فعلية لأنها بدأت بفعل (يحافظ).',
        options: ['جملة اسمية', 'جملة فعلية']
      },
      {
        id: 'lc-5',
        type: 'multiple-choice',
        prompt: 'في جملة "السماءُ ممطرةٌ"، ما هو الخبر؟',
        correctAnswer: 'ممطرةٌ',
        explanation: 'كلمة "ممطرةٌ" هي التي أخبرتنا بحال السماء وأتمت الفائدة.',
        options: ['السماءُ', 'ممطرةٌ']
      }
    ]
  },
  {
    id: 'spelling-hunter',
    title: 'صائد الأخطاء الإملائية',
    description: 'اكتشف الخطأ وصححه (همزات، تاءات).',
    questions: [
      {
        id: 'sh-1',
        type: 'input-correction',
        prompt: 'صحح الكلمة التالية التي تبدأ بهمزة وصل: "أسم"',
        correctAnswer: 'اسم',
        explanation: 'كلمة "اسم" تكتب بهمة وصل (بدون رأس العين) لأنها من الأسماء العشرة السماعية.',
      },
      {
        id: 'sh-2',
        type: 'input-correction',
        prompt: 'صحح الكلمة المنتهية بتاء مربوطة: "المدينه"',
        correctAnswer: 'المدينة',
        explanation: 'تنتهي كلمة "المدينة" بتاء مربوطة (ة) وليس هاء (هـ) لأن التاء تظهر عند الوصل والوقف.',
      },
      {
        id: 'sh-3',
        type: 'input-correction',
        prompt: 'صحح همزة القطع في كلمة: "إستغفر"',
        correctAnswer: 'استغفر',
        explanation: 'الأفعال السداسية (مثل استغفر) همزتها دائماً همزة وصل وليست قطع.',
      },
      {
        id: 'sh-4',
        type: 'input-correction',
        prompt: 'صحح الخطأ في كتابة التاء: "صلاتة"',
        correctAnswer: 'صلاته',
        explanation: 'هنا الهاء ضمير (صلاته)، وتكتب هاء وليس تاء مربوطة لأنها لا تنطق تاء عند الوصل.',
      },
      {
        id: 'sh-5',
        type: 'input-correction',
        prompt: 'صحح همزة القطع: "احمد"',
        correctAnswer: 'أحمد',
        explanation: 'اسم "أحمد" همزته همزة قطع لأن جميع أسماء الأعلام همزتها قطع (إلا ما شذ).',
      }
    ]
  },
  {
    id: 'meanings-syntax',
    title: 'لغز المعاني والإعراب',
    description: 'حل ألغاز المعاني في النصوص الشعرية والمواقع الإعرابية.',
    questions: [
      {
        id: 'ms-1',
        type: 'multiple-choice',
        prompt: 'ما الموقع الإعرابي لكلمة "الفجرُ" في جملة: "أشرق الفجرُ"؟',
        correctAnswer: 'فاعل',
        explanation: 'الفجرُ فاعل لأنه هو الذي قام بفعل الإشراق.',
        options: ['مبتدأ', 'فاعل', 'مفعول به']
      },
      {
        id: 'ms-2',
        type: 'multiple-choice',
        prompt: 'ما معنى كلمة "يختال" في قولنا "يختال الفجر في ثوبه"؟',
        correctAnswer: 'يمشي معجباً بنفسه',
        explanation: 'يختال تعني التبختر والخيلاء والإعجاب بالنفس.',
        options: ['يمشي معجباً بنفسه', 'يصرخ عالياً', 'ينام بهدوء']
      },
      {
        id: 'ms-3',
        type: 'multiple-choice',
        prompt: 'ما الموقع الإعرابي لكلمة "القلمِ" في: "كتبَ الطالبُ الدرسَ بالقلمِ"؟',
        correctAnswer: 'اسم مجرور',
        explanation: 'القلمِ اسم مجرور بالباء وعلامة جره الكسرة.',
        options: ['فاعل', 'مفعول به', 'اسم مجرور']
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
