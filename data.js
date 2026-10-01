const QUESTIONS = [
  {
    "id": "PRE01",
    "type": "info",
    "title": "Antes de recorrer tu Mapa",
    "text": "Este Mapa es una fotografía de tu vida erótica en este momento. No busca evaluarte, diagnosticarte ni decirte cómo debería ser. Busca ayudarte a mirar con mayor claridad lo que estás viviendo y qué empieza a tomar forma desde ahí.\n\nCuando una pregunta se refiera a cómo estás, qué sientes o qué suele ocurrir actualmente, piensa principalmente en las últimas 4 semanas. Si una pregunta indica otro período o se refiere a tu historia, sigue ese marco.\n\nEl recorrido se adapta a tus respuestas. No todas las mujeres verán exactamente las mismas preguntas.\n\nPuedes volver atrás y modificar una respuesta mientras tu Mapa esté en curso. Cuando corresponda, podrás elegir 'No lo tengo claro', 'Prefiero no responder' u 'Omitir por ahora'.\n\nNo hay respuestas correctas o incorrectas ni un puntaje que alcanzar.\n\nAl final, tus respuestas se integran en una lectura situada y en posibles direcciones para seguir explorando.",
    "button": "Continuar",
    "next": "CTX00"
  },
  {
    "id": "CTX00",
    "type": "single",
    "text": "Antes de comenzar, cuéntanos un poco sobre ti.\n\n¿Estás actualmente en una relación de pareja?",
    "options": [
      {
        "id": "CTX00_O01",
        "text": "Sí"
      },
      {
        "id": "CTX00_O02",
        "text": "No"
      },
      {
        "id": "CTX00_O03",
        "text": "Prefiero no responder"
      }
    ],
    "next_logic": "return ans.includes('CTX00_O01') ? 'CTX01' : 'END_NO_ELIGIBLE';"
  },
  {
    "id": "CTX01",
    "type": "text",
    "text": "Edad",
    "placeholder": "Ej: 45",
    "next_logic": "return 'CTX02';"
  },
  {
    "id": "CTX02",
    "type": "text",
    "text": "País de residencia",
    "placeholder": "Ej: Chile",
    "next_logic": "return 'CTX03';"
  },
  {
    "id": "CTX03",
    "type": "single",
    "text": "Estado civil",
    "options": [
      {
        "id": "CTX03_O01",
        "text": "Soltera"
      },
      {
        "id": "CTX03_O02",
        "text": "Casada"
      },
      {
        "id": "CTX03_O03",
        "text": "Unión civil / acuerdo de convivencia"
      },
      {
        "id": "CTX03_O04",
        "text": "Separada"
      },
      {
        "id": "CTX03_O05",
        "text": "Divorciada"
      },
      {
        "id": "CTX03_O06",
        "text": "Viuda"
      },
      {
        "id": "CTX03_O07",
        "text": "Otro"
      },
      {
        "id": "CTX03_O08",
        "text": "Prefiero no responder"
      }
    ],
    "next_logic": "return 'CTX04';"
  },
  {
    "id": "CTX04",
    "type": "single",
    "text": "Convivencia con la pareja actual",
    "options": [
      {
        "id": "CTX04_O01",
        "text": "Convivimos"
      },
      {
        "id": "CTX04_O02",
        "text": "Convivimos parte del tiempo"
      },
      {
        "id": "CTX04_O03",
        "text": "No convivimos"
      },
      {
        "id": "CTX04_O04",
        "text": "Prefiero no responder"
      }
    ],
    "next_logic": "return 'CTX05';"
  },
  {
    "id": "CTX05",
    "type": "single",
    "text": "Tiempo de la relación actual",
    "options": [
      {
        "id": "CTX05_O01",
        "text": "Menos de 1 año"
      },
      {
        "id": "CTX05_O02",
        "text": "1–5 años"
      },
      {
        "id": "CTX05_O03",
        "text": "6–10 años"
      },
      {
        "id": "CTX05_O04",
        "text": "11–20 años"
      },
      {
        "id": "CTX05_O05",
        "text": "Más de 20 años"
      },
      {
        "id": "CTX05_O06",
        "text": "Prefiero no responder"
      }
    ],
    "next_logic": "return 'L_MIRADOR';"
  },
  {
    "id": "L_MIRADOR",
    "type": "landscape",
    "title": "MIRADOR",
    "text": "Todo mapa comienza con una mirada. Antes de avanzar, observa desde dónde estás mirando.",
    "next": "P01"
  },
  {
    "id": "P01",
    "type": "carousel",
    "max": 2,
    "text": "Pensando en tu vida erótica, ¿cuáles de estas frases se parecen más a lo que estás viviendo hoy?",
    "options": [
      {
        "id": "P01_O01",
        "text": "Estoy bien con mi vida erótica actualmente"
      },
      {
        "id": "P01_O02",
        "text": "Hay cosas que extraño y me gustaría recuperar"
      },
      {
        "id": "P01_O03",
        "text": "Algo cambió y no entiendo bien qué me está pasando"
      },
      {
        "id": "P01_O04",
        "text": "No me gusta cómo está y quisiera hacer algo"
      },
      {
        "id": "P01_O05",
        "text": "Me gustaría explorar cosas nuevas"
      },
      {
        "id": "P01_O06",
        "text": "Estoy bastante desconectada y todavía no sé qué quiero"
      },
      {
        "id": "P01_O07",
        "text": "Ninguna de las anteriores",
        "ex": true
      }
    ],
    "next_logic": "return ans.includes('P01_O07') ? 'P34' : 'P02';"
  },
  {
    "id": "P02",
    "type": "gradient_spatial",
    "text": "¿Qué tan cerca está la vida erótica que tienes hoy de la que te gustaría tener?",
    "options": [
      {
        "id": "P02_O01",
        "text": "Muy cerca"
      },
      {
        "id": "P02_O02",
        "text": "Bastante cerca"
      },
      {
        "id": "P02_O03",
        "text": "Más o menos"
      },
      {
        "id": "P02_O04",
        "text": "Bastante lejos"
      },
      {
        "id": "P02_O05",
        "text": "Muy lejos"
      },
      {
        "id": "P02_O06",
        "text": "Estoy bien tal como está",
        "out_of_scale": true
      },
      {
        "id": "P02_O07",
        "text": "No sé",
        "out_of_scale": true
      }
    ],
    "next_logic": "return 'P03';"
  },
  {
    "id": "P03",
    "type": "views",
    "text": "En el último tiempo, ¿ha habido algún cambio importante en tu vida que pueda relacionarse con tu vida erótica?",
    "optional": true,
    "views": [
      {
        "title": "Cuerpo y salud",
        "options": [
          {
            "id": "P03_O01",
            "text": "🪞 Cambios en el cuerpo"
          },
          {
            "id": "P03_O02",
            "text": "🩺 Cambios de salud"
          },
          {
            "id": "P03_O03",
            "text": "⚕️ Tratamiento"
          },
          {
            "id": "P03_O04",
            "text": "💊 Medicamento"
          }
        ]
      },
      {
        "title": "Relación",
        "options": [
          {
            "id": "P03_O05",
            "text": "💞 Cambios en la relación"
          },
          {
            "id": "P03_O06",
            "text": "🛏️ Dificultades sexuales de la pareja"
          }
        ]
      },
      {
        "title": "Vida cotidiana",
        "options": [
          {
            "id": "P03_O07",
            "text": "💼 Trabajo"
          },
          {
            "id": "P03_O08",
            "text": "💰 Economía"
          },
          {
            "id": "P03_O09",
            "text": "🤲 Responsabilidades de cuidado"
          },
          {
            "id": "P03_O10",
            "text": "🏠 Cambios en el hogar"
          },
          {
            "id": "P03_O11",
            "text": "📦 Mudanza"
          }
        ]
      },
      {
        "title": "Otros acontecimientos y cierre",
        "options": [
          {
            "id": "P03_O12",
            "text": "🏥 Enfermedad"
          },
          {
            "id": "P03_O13",
            "text": "🕯️ Duelo"
          },
          {
            "id": "P03_O14",
            "text": "➕ Otro"
          },
          {
            "id": "P03_O15",
            "text": "✖️ Ningún cambio",
            "ex": true
          },
          {
            "id": "P03_O16",
            "text": "❓ No sé",
            "ex": true
          }
        ]
      }
    ],
    "next_logic": "if (ans.includes('P03_O14')) return 'P35'; if (ans.includes('P03_O04')) return 'P03_MED'; return hasAny(['P01_O02','P01_O03','P01_O06'], getAns('P01')) ? 'P04' : 'L_MANANTIAL';"
  },
  {
    "id": "P03_MED",
    "type": "multiple",
    "text": "¿Estás tomando actualmente alguno de estos tipos de medicamentos? Puedes marcar más de uno.",
    "options": [
      {
        "id": "P03_M01",
        "text": "Antidepresivos"
      },
      {
        "id": "P03_M02",
        "text": "Antipsicóticos"
      },
      {
        "id": "P03_M03",
        "text": "Antiepilépticos/anticonvulsivantes"
      },
      {
        "id": "P03_M04",
        "text": "Medicamentos para el dolor de uso prolongado"
      },
      {
        "id": "P03_M05",
        "text": "Medicamentos para la presión arterial o el corazón"
      },
      {
        "id": "P03_M06",
        "text": "Anticonceptivos hormonales"
      },
      {
        "id": "P03_M07",
        "text": "Tratamiento hormonal"
      },
      {
        "id": "P03_M08",
        "text": "Otro medicamento"
      },
      {
        "id": "P03_M09",
        "text": "No sé",
        "ex": true
      },
      {
        "id": "P03_M10",
        "text": "Prefiero no responder",
        "ex": true
      }
    ],
    "next_logic": "return ans.includes('P03_M08') ? 'P03_MED_TXT' : (hasAny(['P01_O02','P01_O03','P01_O06'], getAns('P01')) ? 'P04' : 'L_MANANTIAL');"
  },
  {
    "id": "P03_MED_TXT",
    "type": "text",
    "optional": true,
    "text": "Si sabes el nombre, puedes escribirlo.",
    "next_logic": "return hasAny(['P01_O02','P01_O03','P01_O06'], getAns('P01')) ? 'P04' : 'L_MANANTIAL';"
  },
  {
    "id": "P34",
    "type": "text",
    "optional": true,
    "text": "¿Cómo lo estás viviendo tú?",
    "next_logic": "return 'P02';"
  },
  {
    "id": "P35",
    "type": "text",
    "optional": true,
    "text": "¿Qué cambió?",
    "next_logic": "return getAns('P03').includes('P03_O04') ? 'P03_MED' : (hasAny(['P01_O02','P01_O03','P01_O06'], getAns('P01')) ? 'P04' : 'L_MANANTIAL');"
  },
  {
    "id": "P04",
    "type": "single",
    "optional": true,
    "text": "¿Sientes que hubo algún momento importante en que tu vida erótica cambió, aunque haya sido hace tiempo?",
    "options": [
      {
        "id": "P04_O01",
        "text": "Sí"
      },
      {
        "id": "P04_O02",
        "text": "No"
      },
      {
        "id": "P04_O03",
        "text": "No sé"
      },
      {
        "id": "P04_O04",
        "text": "Prefiero no responder"
      }
    ],
    "next_logic": "return ans.includes('P04_O01') ? 'P05' : 'L_MANANTIAL';"
  },
  {
    "id": "P05",
    "type": "text",
    "optional": true,
    "text": "¿Qué cambió en ese momento?",
    "next_logic": "return 'L_MANANTIAL';"
  },
  {
    "id": "L_MANANTIAL",
    "type": "landscape",
    "title": "MANANTIAL",
    "text": "Bajo la superficie, el agua está en movimiento. El cauce aparece cuando encuentra su rumbo.",
    "next": "P06"
  },
  {
    "id": "P06",
    "type": "single",
    "text": "En el último tiempo, ¿hay algún cambio o molestia en tu cuerpo o bienestar que esté afectando tu vida erótica?",
    "options": [
      {
        "id": "P06_O01",
        "text": "Sí"
      },
      {
        "id": "P06_O02",
        "text": "Puede ser"
      },
      {
        "id": "P06_O03",
        "text": "No"
      },
      {
        "id": "P06_O04",
        "text": "No sé"
      },
      {
        "id": "P06_O05",
        "text": "Prefiero no responder"
      }
    ],
    "next_logic": "return hasAny(['P06_O01', 'P06_O02'], ans) ? 'P07' : 'P08';"
  },
  {
    "id": "P07",
    "type": "views",
    "max": 3,
    "text": "De estas posibilidades, ¿cuáles están afectando más tu vida erótica hoy?",
    "views": [
      {
        "title": "Cuerpo",
        "options": [
          {
            "id": "P07_O01",
            "text": "🩹 Dolor"
          },
          {
            "id": "P07_O02",
            "text": "💧 Lubricación"
          },
          {
            "id": "P07_O03",
            "text": "🔻 Molestias genitales"
          },
          {
            "id": "P07_O04",
            "text": "🚻 Molestias urinarias"
          },
          {
            "id": "P07_O05",
            "text": "🦴 Molestias musculoesqueléticas"
          },
          {
            "id": "P07_O06",
            "text": "⚡ Cambios de sensibilidad"
          }
        ]
      },
      {
        "title": "Ritmos físicos",
        "options": [
          {
            "id": "P07_O07",
            "text": "🔋 Energía"
          },
          {
            "id": "P07_O08",
            "text": "🌙 Sueño"
          },
          {
            "id": "P07_O09",
            "text": "🔥 Bochornos"
          },
          {
            "id": "P07_O10",
            "text": "🪫 Cansancio físico"
          }
        ]
      },
      {
        "title": "Estado interno y cierre",
        "options": [
          {
            "id": "P07_O11",
            "text": "🌤️ Ánimo"
          },
          {
            "id": "P07_O12",
            "text": "🌀 Ansiedad"
          },
          {
            "id": "P07_O13",
            "text": "🧠 Cansancio mental"
          },
          {
            "id": "P07_O14",
            "text": "➕ Otra"
          },
          {
            "id": "P07_O15",
            "text": "❓ No lo tengo claro",
            "ex": true
          }
        ]
      }
    ],
    "next_logic": "return ans.includes('P07_O14') ? 'P38' : 'P08';"
  },
  {
    "id": "P38",
    "type": "text",
    "optional": true,
    "text": "¿Qué otro cambio o molestia está afectando tu vida erótica?",
    "next_logic": "return 'P08';"
  },
  {
    "id": "P08",
    "type": "timeline_gradient",
    "text": "En el último tiempo, ¿con qué frecuencia aparecen ganas de tener un encuentro erótico o sexual antes de que empiece algo?",
    "options": [
      {
        "id": "P08_O01",
        "text": "Muy seguido"
      },
      {
        "id": "P08_O02",
        "text": "Seguido"
      },
      {
        "id": "P08_O03",
        "text": "A veces"
      },
      {
        "id": "P08_O04",
        "text": "Rara vez"
      },
      {
        "id": "P08_O05",
        "text": "Nunca"
      }
    ],
    "next_logic": "return 'P09';"
  },
  {
    "id": "P09",
    "type": "timeline_gradient",
    "text": "Cuando al principio no tienes ganas, pero quieres darte una oportunidad, ¿sientes que el deseo puede aumentar a medida que avanza el encuentro?",
    "options": [
      {
        "id": "P09_O01",
        "text": "Sí, casi siempre"
      },
      {
        "id": "P09_O02",
        "text": "Muchas veces"
      },
      {
        "id": "P09_O03",
        "text": "A veces"
      },
      {
        "id": "P09_O04",
        "text": "Rara vez"
      },
      {
        "id": "P09_O05",
        "text": "Nunca"
      },
      {
        "id": "P09_O06",
        "text": "No me ha pasado",
        "out_of_scale": true
      },
      {
        "id": "P09_O07",
        "text": "No suelo darme esa oportunidad",
        "out_of_scale": true
      }
    ],
    "next_logic": "return 'P10';"
  },
  {
    "id": "P10",
    "type": "gradient_spatial",
    "text": "Cuando tienes un encuentro erótico que elegiste, ¿cuánto lo disfrutas?",
    "options": [
      {
        "id": "P10_O01",
        "text": "Mucho"
      },
      {
        "id": "P10_O02",
        "text": "Bastante"
      },
      {
        "id": "P10_O03",
        "text": "Algo"
      },
      {
        "id": "P10_O04",
        "text": "Poco"
      },
      {
        "id": "P10_O05",
        "text": "Nada"
      },
      {
        "id": "P10_O06",
        "text": "Depende",
        "out_of_scale": true
      },
      {
        "id": "P10_O07",
        "text": "No sé",
        "out_of_scale": true
      },
      {
        "id": "P10_O08",
        "text": "No he tenido encuentros eróticos últimamente",
        "out_of_scale": true
      }
    ],
    "next_logic": "return hasAny(['P10_O04', 'P10_O05', 'P10_O06'], ans) ? 'P12' : 'P11';"
  },
  {
    "id": "P12",
    "type": "multiple",
    "max": 3,
    "text": "Cuando un encuentro erótico no resulta como esperabas o no lo disfrutas, ¿qué suele pasarte después?",
    "options": [
      {
        "id": "P12_O01",
        "text": "Me frustro o desanimo"
      },
      {
        "id": "P12_O02",
        "text": "Me preocupa que vuelva a pasar"
      },
      {
        "id": "P12_O03",
        "text": "Me gustaría volver a intentarlo, pero me cuesta"
      },
      {
        "id": "P12_O04",
        "text": "Prefiero evitar otro encuentro para que no vuelva a pasar"
      },
      {
        "id": "P12_O05",
        "text": "No quiero volver a tener otro encuentro erótico por ahora"
      },
      {
        "id": "P12_O06",
        "text": "Tengo ganas de volver a intentarlo"
      },
      {
        "id": "P12_O07",
        "text": "No me ha pasado",
        "ex": true
      },
      {
        "id": "P12_O08",
        "text": "No lo tengo claro",
        "ex": true
      }
    ],
    "next_logic": "return 'P11';"
  },
  {
    "id": "P11",
    "type": "body_map",
    "optional": true,
    "text": "¿En qué zonas de tu cuerpo reconoces sensaciones agradables o eróticas?",
    "options": [
      {
        "id": "Z01",
        "text": "Rostro y labios"
      },
      {
        "id": "Z02",
        "text": "Orejas y cuello"
      },
      {
        "id": "Z03",
        "text": "Pecho"
      },
      {
        "id": "Z04",
        "text": "Manos"
      },
      {
        "id": "Z05",
        "text": "Abdomen y espalda"
      },
      {
        "id": "Z06",
        "text": "Pelvis"
      },
      {
        "id": "Z07",
        "text": "Vulva"
      },
      {
        "id": "Z08",
        "text": "Glúteos y muslos"
      },
      {
        "id": "Z09",
        "text": "Piernas y pies"
      },
      {
        "id": "P11_O01",
        "text": "No identifico ninguna en este momento",
        "ex": true,
        "out_of_scale": true
      },
      {
        "id": "P11_O02",
        "text": "No lo tengo claro",
        "ex": true,
        "out_of_scale": true
      },
      {
        "id": "P11_O03",
        "text": "Prefiero no responder",
        "ex": true,
        "out_of_scale": true
      }
    ],
    "next_logic": "return 'L_SENDERO';"
  },
  {
    "id": "L_SENDERO",
    "type": "landscape",
    "title": "SENDERO",
    "text": "Compartir camino cambia el paso. Entre dos, la intimidad tiene su propia geografía.",
    "next": "P13"
  },
  {
    "id": "P13",
    "type": "distance_pair",
    "text": "Hoy, en términos afectivos, ¿qué tan cerca te sientes de tu pareja?",
    "options": [
      {
        "id": "P13_O01",
        "text": "Muy cerca"
      },
      {
        "id": "P13_O02",
        "text": "Bastante cerca"
      },
      {
        "id": "P13_O03",
        "text": "Ni cerca ni distante"
      },
      {
        "id": "P13_O04",
        "text": "Bastante distante"
      },
      {
        "id": "P13_O05",
        "text": "Muy distante"
      },
      {
        "id": "P13_O06",
        "text": "Depende",
        "out_of_scale": true
      },
      {
        "id": "P13_O07",
        "text": "No lo tengo claro",
        "out_of_scale": true
      },
      {
        "id": "P13_O08",
        "text": "No me importa",
        "out_of_scale": true
      }
    ],
    "next_logic": "return 'P14';"
  },
  {
    "id": "P14",
    "type": "distance_pair",
    "text": "Y, eróticamente, ¿qué tan cerca te sientes de tu pareja?",
    "options": [
      {
        "id": "P14_O01",
        "text": "Muy cerca"
      },
      {
        "id": "P14_O02",
        "text": "Bastante cerca"
      },
      {
        "id": "P14_O03",
        "text": "Ni cerca ni distante"
      },
      {
        "id": "P14_O04",
        "text": "Bastante distante"
      },
      {
        "id": "P14_O05",
        "text": "Muy distante"
      },
      {
        "id": "P14_O06",
        "text": "Depende",
        "out_of_scale": true
      },
      {
        "id": "P14_O07",
        "text": "No lo tengo claro",
        "out_of_scale": true
      },
      {
        "id": "P14_O08",
        "text": "No me importa",
        "out_of_scale": true
      }
    ],
    "next_logic": "return 'P15';"
  },
  {
    "id": "P15",
    "type": "gradient_spatial",
    "text": "En tus encuentros eróticos, ¿con qué frecuencia sientes que tu experiencia y tu placer importan tanto como los de tu pareja?",
    "options": [
      {
        "id": "P15_O01",
        "text": "Siempre o casi siempre"
      },
      {
        "id": "P15_O02",
        "text": "La mayor parte del tiempo"
      },
      {
        "id": "P15_O03",
        "text": "A veces"
      },
      {
        "id": "P15_O04",
        "text": "Pocas veces"
      },
      {
        "id": "P15_O05",
        "text": "Nunca"
      },
      {
        "id": "P15_O06",
        "text": "Depende",
        "out_of_scale": true
      },
      {
        "id": "P15_O07",
        "text": "No he tenido encuentros últimamente",
        "out_of_scale": true
      },
      {
        "id": "P15_O08",
        "text": "No lo tengo claro",
        "out_of_scale": true
      },
      {
        "id": "P15_O09",
        "text": "Prefiero no responder",
        "out_of_scale": true
      }
    ],
    "next_logic": "return 'P16';"
  },
  {
    "id": "P16",
    "type": "single",
    "text": "Cuando algo no te gusta, no quieres hacerlo o quieres parar, ¿qué tan posible te resulta decirlo?",
    "options": [
      {
        "id": "P16_O01",
        "text": "Me resulta fácil"
      },
      {
        "id": "P16_O02",
        "text": "En general puedo decirlo"
      },
      {
        "id": "P16_O03",
        "text": "Depende"
      },
      {
        "id": "P16_O04",
        "text": "Me cuesta"
      },
      {
        "id": "P16_O05",
        "text": "Siento que no puedo hacerlo"
      },
      {
        "id": "P16_O06",
        "text": "No se ha dado esta situación"
      },
      {
        "id": "P16_O07",
        "text": "No lo tengo claro"
      },
      {
        "id": "P16_O08",
        "text": "Prefiero no responder"
      }
    ],
    "next_logic": "return hasAny(['P16_O03', 'P16_O04', 'P16_O05'], ans) ? 'P17' : 'L_CLIMA';"
  },
  {
    "id": "P17",
    "type": "single",
    "text": "Cuando dices que no, quieres parar o cambias de idea, ¿cómo suele reaccionar tu pareja?",
    "options": [
      {
        "id": "P17_O01",
        "text": "Lo respeta sin problema"
      },
      {
        "id": "P17_O02",
        "text": "En general lo respeta"
      },
      {
        "id": "P17_O03",
        "text": "A veces insiste o se molesta"
      },
      {
        "id": "P17_O04",
        "text": "Muchas veces insiste o se molesta"
      },
      {
        "id": "P17_O05",
        "text": "Depende"
      },
      {
        "id": "P17_O06",
        "text": "No se ha dado esta situación"
      },
      {
        "id": "P17_O07",
        "text": "No lo tengo claro"
      },
      {
        "id": "P17_O08",
        "text": "Prefiero no responder"
      }
    ],
    "next_logic": "return (hasAny(['P17_O03', 'P17_O04', 'P17_O05', 'P17_O07'], ans) || hasAny(['P16_O05'], getAns('P16'))) ? 'P18' : 'L_CLIMA';"
  },
  {
    "id": "P18",
    "type": "single",
    "text": "¿Te sientes segura para decir que no o parar cuando lo necesitas?",
    "options": [
      {
        "id": "P18_O01",
        "text": "Sí"
      },
      {
        "id": "P18_O02",
        "text": "Generalmente sí"
      },
      {
        "id": "P18_O03",
        "text": "Depende"
      },
      {
        "id": "P18_O04",
        "text": "No"
      },
      {
        "id": "P18_O05",
        "text": "No lo tengo claro"
      },
      {
        "id": "P18_O06",
        "text": "Prefiero no responder"
      }
    ],
    "next_logic": "return 'L_CLIMA';"
  },
  {
    "id": "L_CLIMA",
    "type": "landscape",
    "title": "CLIMA",
    "text": "Lo cotidiano se filtra en lo íntimo. Algunos días dejan aire; otros piden espacio.",
    "next": "P19"
  },
  {
    "id": "P19",
    "type": "density_field",
    "text": "¿Cómo influye tu vida cotidiana en tu vida erótica?",
    "options": [
      {
        "id": "P19_O01",
        "text": "La favorece mucho"
      },
      {
        "id": "P19_O02",
        "text": "La favorece algo"
      },
      {
        "id": "P19_O03",
        "text": "A veces la favorece y a veces la dificulta"
      },
      {
        "id": "P19_O04",
        "text": "La dificulta algo"
      },
      {
        "id": "P19_O05",
        "text": "La dificulta mucho"
      },
      {
        "id": "P19_O06",
        "text": "No influye",
        "out_of_scale": true
      },
      {
        "id": "P19_O07",
        "text": "No lo tengo claro",
        "out_of_scale": true
      }
    ],
    "next_logic": "return hasAny(['P19_O03', 'P19_O04', 'P19_O05'], ans) ? 'P20' : 'P21';"
  },
  {
    "id": "P20",
    "type": "views",
    "max": 3,
    "text": "¿Qué es lo que más pesa hoy en tu vida cotidiana cuando se trata de tu vida erótica?",
    "views": [
      {
        "title": "Recursos y responsabilidades",
        "options": [
          {
            "id": "P20_O01",
            "text": "💼 Trabajo"
          },
          {
            "id": "P20_O02",
            "text": "💰 Dinero"
          },
          {
            "id": "P20_O03",
            "text": "🧠 Carga mental"
          },
          {
            "id": "P20_O04",
            "text": "🤲 Cuidados de otras personas"
          },
          {
            "id": "P20_O05",
            "text": "🧺 Responsabilidades del hogar"
          },
          {
            "id": "P20_O06",
            "text": "📋 Otras responsabilidades"
          }
        ]
      },
      {
        "title": "Disponibilidad y cierre",
        "options": [
          {
            "id": "P20_O07",
            "text": "⏳ Falta de tiempo"
          },
          {
            "id": "P20_O08",
            "text": "🧱 Falta de espacio"
          },
          {
            "id": "P20_O09",
            "text": "🔓 Falta de privacidad"
          },
          {
            "id": "P20_O10",
            "text": "➕ Otra cosa"
          },
          {
            "id": "P20_O11",
            "text": "❓ No lo tengo claro",
            "ex": true
          }
        ]
      }
    ],
    "next_logic": "return ans.includes('P20_O10') ? 'P39' : 'P21';"
  },
  {
    "id": "P39",
    "type": "text",
    "optional": true,
    "text": "¿Qué otra cosa está pesando hoy?",
    "next_logic": "return 'P21';"
  },
  {
    "id": "P21",
    "type": "gradient_spatial",
    "text": "En general, ¿sientes que tienes margen real para tomar decisiones sobre tu propia vida erótica?",
    "options": [
      {
        "id": "P21_O01",
        "text": "Mucho"
      },
      {
        "id": "P21_O02",
        "text": "Bastante"
      },
      {
        "id": "P21_O03",
        "text": "Algo"
      },
      {
        "id": "P21_O04",
        "text": "Poco"
      },
      {
        "id": "P21_O05",
        "text": "Muy poco"
      },
      {
        "id": "P21_O06",
        "text": "No sé",
        "out_of_scale": true
      }
    ],
    "next_logic": "return hasAny(['P21_O04', 'P21_O05'], ans) ? 'P33' : 'L_HORIZONTE';"
  },
  {
    "id": "P33",
    "type": "multiple",
    "text": "¿Hay algo de tu autonomía —como tu tiempo, tu dinero o tu libertad para decidir— que limite tu vida erótica?",
    "options": [
      {
        "id": "P33_O01",
        "text": "Mi tiempo"
      },
      {
        "id": "P33_O02",
        "text": "El dinero"
      },
      {
        "id": "P33_O03",
        "text": "Mi libertad para tomar algunas decisiones"
      },
      {
        "id": "P33_O04",
        "text": "Dependo de mi pareja para algunas decisiones o recursos"
      },
      {
        "id": "P33_O05",
        "text": "Otra cosa"
      },
      {
        "id": "P33_O06",
        "text": "Nada de esto",
        "ex": true
      },
      {
        "id": "P33_O07",
        "text": "No lo había pensado",
        "ex": true
      },
      {
        "id": "P33_O08",
        "text": "Prefiero no responder",
        "ex": true
      }
    ],
    "next_logic": "return ans.includes('P33_O05') ? 'P40' : 'L_HORIZONTE';"
  },
  {
    "id": "P40",
    "type": "text",
    "optional": true,
    "text": "¿Qué otra cosa limita tu margen de decisión?",
    "next_logic": "return 'L_HORIZONTE';"
  },
  {
    "id": "L_HORIZONTE",
    "type": "landscape",
    "title": "HORIZONTE",
    "text": "Una dirección puede hacerse visible antes de tener nombre. El horizonte empieza justo ahí.",
    "next": "P22"
  },
  {
    "id": "P22",
    "type": "views",
    "max": 3,
    "text": "¿Qué es lo más valioso para ti de tu vida erótica?",
    "views": [
      {
        "title": "Experiencia propia",
        "options": [
          {
            "id": "P22_O01",
            "text": "✨ Sentir placer"
          },
          {
            "id": "P22_O02",
            "text": "🔥 Sentir deseo"
          },
          {
            "id": "P22_O03",
            "text": "💭 Fantasear o imaginar"
          },
          {
            "id": "P22_O04",
            "text": "🌿 Sentirme conectada con mi cuerpo"
          }
        ]
      },
      {
        "title": "Conocimiento y libertad",
        "options": [
          {
            "id": "P22_O05",
            "text": "🪞 Conocerme más"
          },
          {
            "id": "P22_O06",
            "text": "🔎 Descubrir lo que me gusta"
          },
          {
            "id": "P22_O07",
            "text": "🗣️ Expresar lo que quiero"
          },
          {
            "id": "P22_O08",
            "text": "🧭 Explorar nuevas posibilidades"
          },
          {
            "id": "P22_O09",
            "text": "🪽 Vivir a mi manera"
          }
        ]
      },
      {
        "title": "Vínculo y experiencia compartida",
        "options": [
          {
            "id": "P22_O10",
            "text": "🫂 Compartir intimidad"
          },
          {
            "id": "P22_O11",
            "text": "💫 Sentirme deseada"
          },
          {
            "id": "P22_O12",
            "text": "🎲 Jugar y divertirme"
          },
          {
            "id": "P22_O13",
            "text": "🫶 Sentir conexión profunda"
          }
        ]
      },
      {
        "title": "Cierre",
        "options": [
          {
            "id": "P22_O14",
            "text": "➕ Otra"
          },
          {
            "id": "P22_O15",
            "text": "➖ Nada en particular",
            "ex": true
          },
          {
            "id": "P22_O16",
            "text": "❓ No lo había pensado",
            "ex": true
          }
        ]
      }
    ],
    "next_logic": "return ans.includes('P22_O14') ? 'P36' : 'P23';"
  },
  {
    "id": "P36",
    "type": "text",
    "optional": true,
    "text": "¿Qué es lo más valioso para ti?",
    "next_logic": "return 'P23';"
  },
  {
    "id": "P23",
    "type": "text",
    "optional": true,
    "text": "Si quieres contarnos, ¿cómo te gustaría que fuera tu vida erótica en esta etapa de tu vida?",
    "next_logic": "return 'P24';"
  },
  {
    "id": "P24",
    "type": "views",
    "max": 4,
    "text": "Por último, en esta etapa de tu vida, ¿hay algo de tu vida erótica que te gustaría mover, recuperar o explorar?",
    "views": [
      {
        "title": "Experiencia",
        "options": [
          {
            "id": "P24_O01",
            "text": "🔥 Tener más ganas"
          },
          {
            "id": "P24_O02",
            "text": "✨ Sentir más placer"
          },
          {
            "id": "P24_O03",
            "text": "☀️ Disfrutar más los encuentros"
          },
          {
            "id": "P24_O04",
            "text": "🌊 Explorar mi orgasmo"
          }
        ]
      },
      {
        "title": "Cuerpo",
        "options": [
          {
            "id": "P24_O05",
            "text": "💓 Reconocer mejor lo que pasa en mi cuerpo"
          },
          {
            "id": "P24_O06",
            "text": "🌿 Sentirme más cómoda con mi cuerpo"
          },
          {
            "id": "P24_O07",
            "text": "💫 Sentirme más deseada"
          }
        ]
      },
      {
        "title": "Relación",
        "options": [
          {
            "id": "P24_O08",
            "text": "🫂 Encontrar una forma de cercanía que me haga sentido"
          },
          {
            "id": "P24_O09",
            "text": "🤝 Sentir que mi placer importa tanto como el de mi pareja"
          },
          {
            "id": "P24_O10",
            "text": "🗣️ Expresar mejor lo que quiero y lo que no quiero"
          }
        ]
      },
      {
        "title": "Apertura y posibilidades",
        "options": [
          {
            "id": "P24_O11",
            "text": "🧭 Experimentar cosas nuevas"
          },
          {
            "id": "P24_O12",
            "text": "⏳ Tener más tiempo o espacio para mi vida erótica"
          },
          {
            "id": "P24_O13",
            "text": "🪽 Sentirme más libre para expresar o vivir lo que deseo"
          }
        ]
      },
      {
        "title": "Cierre",
        "options": [
          {
            "id": "P24_O14",
            "text": "↩️ Recuperar algo que antes tenía"
          },
          {
            "id": "P24_O15",
            "text": "⏸️ No quiero mover nada ahora",
            "ex": true
          },
          {
            "id": "P24_O16",
            "text": "➕ Otra"
          },
          {
            "id": "P24_O17",
            "text": "❓ No sé todavía",
            "ex": true
          }
        ]
      }
    ],
    "next_logic": "return ans.includes('P24_O16') ? 'P37' : 'P25';"
  },
  {
    "id": "P37",
    "type": "text",
    "optional": true,
    "text": "¿Qué te gustaría mover, recuperar o explorar?",
    "next_logic": "return 'P25';"
  },
  {
    "id": "P25",
    "type": "single",
    "text": "¿Cómo estás viviendo el orgasmo?",
    "options": [
      {
        "id": "P25_O01",
        "text": "Llego con facilidad y estoy bien así"
      },
      {
        "id": "P25_O02",
        "text": "Llego, pero me cuesta más que antes"
      },
      {
        "id": "P25_O03",
        "text": "Llego algunas veces y me gustaría llegar más"
      },
      {
        "id": "P25_O04",
        "text": "Rara vez llego y eso me importa"
      },
      {
        "id": "P25_O05",
        "text": "Rara vez llego y no me preocupa"
      },
      {
        "id": "P25_O06",
        "text": "Nunca llego"
      },
      {
        "id": "P25_O07",
        "text": "Nunca he tenido un orgasmo"
      },
      {
        "id": "P25_O08",
        "text": "Hace tanto que no llego que ni me acuerdo"
      },
      {
        "id": "P25_O09",
        "text": "El orgasmo no es importante para mí"
      },
      {
        "id": "P25_O10",
        "text": "No sé"
      },
      {
        "id": "P25_O11",
        "text": "Prefiero no responder"
      }
    ],
    "next_logic": "return 'P26';",
    "condition": "return getAns('P24').includes('P24_O04');"
  },
  {
    "id": "P26",
    "type": "gradient_spatial",
    "text": "En tu vida erótica, ¿qué tan fácil te resulta reconocer lo que pasa en tu cuerpo?",
    "options": [
      {
        "id": "P26_O01",
        "text": "Muy fácil"
      },
      {
        "id": "P26_O02",
        "text": "Bastante fácil"
      },
      {
        "id": "P26_O03",
        "text": "A veces sí, a veces no"
      },
      {
        "id": "P26_O04",
        "text": "Me cuesta"
      },
      {
        "id": "P26_O05",
        "text": "Me cuesta mucho"
      },
      {
        "id": "P26_O06",
        "text": "No lo tengo claro",
        "out_of_scale": true
      }
    ],
    "next_logic": "return 'P27';",
    "condition": "return getAns('P24').includes('P24_O05');"
  },
  {
    "id": "P27",
    "type": "gradient_spatial",
    "text": "En tu vida erótica, ¿qué tan cómoda te sientes con tu cuerpo?",
    "options": [
      {
        "id": "P27_O01",
        "text": "Muy cómoda"
      },
      {
        "id": "P27_O02",
        "text": "Bastante cómoda"
      },
      {
        "id": "P27_O03",
        "text": "Más o menos"
      },
      {
        "id": "P27_O04",
        "text": "Poco cómoda"
      },
      {
        "id": "P27_O05",
        "text": "Nada cómoda"
      },
      {
        "id": "P27_O06",
        "text": "No lo tengo claro",
        "out_of_scale": true
      }
    ],
    "next_logic": "return 'P28';",
    "condition": "return getAns('P24').includes('P24_O06');"
  },
  {
    "id": "P28",
    "type": "single",
    "text": "¿Te gustaría hacer cosas eróticas que no estás haciendo o hacer más seguido algunas que ya haces?",
    "options": [
      {
        "id": "P28_O01",
        "text": "Sí, me gustaría experimentar cosas nuevas"
      },
      {
        "id": "P28_O02",
        "text": "Sí, me gustaría hacer más algunas cosas que ya hago"
      },
      {
        "id": "P28_O03",
        "text": "Ambas"
      },
      {
        "id": "P28_O04",
        "text": "Ninguna de las dos"
      },
      {
        "id": "P28_O05",
        "text": "No sé"
      }
    ],
    "next_logic": "return 'P29';",
    "condition": "return getAns('P24').includes('P24_O11') || getAns('P01').includes('P01_O05');"
  },
  {
    "id": "P29",
    "type": "single",
    "text": "¿Hay cosas que te gustan o te dan curiosidad, pero que te cuesta reconocer incluso para ti misma?",
    "options": [
      {
        "id": "P29_O01",
        "text": "Sí"
      },
      {
        "id": "P29_O02",
        "text": "A veces"
      },
      {
        "id": "P29_O03",
        "text": "No"
      },
      {
        "id": "P29_O04",
        "text": "No sé"
      },
      {
        "id": "P29_O05",
        "text": "Prefiero no responder"
      }
    ],
    "next_logic": "return 'P30';",
    "condition": "return getAns('P24').includes('P24_O13') || getAns('P22').includes('P22_O09');"
  },
  {
    "id": "P30",
    "type": "gradient_spatial",
    "text": "¿Qué tan deseada te sientes por tu pareja?",
    "options": [
      {
        "id": "P30_O01",
        "text": "Mucho"
      },
      {
        "id": "P30_O02",
        "text": "Bastante"
      },
      {
        "id": "P30_O03",
        "text": "Más o menos"
      },
      {
        "id": "P30_O04",
        "text": "Poco"
      },
      {
        "id": "P30_O05",
        "text": "Nada"
      },
      {
        "id": "P30_O06",
        "text": "No lo tengo claro",
        "out_of_scale": true
      },
      {
        "id": "P30_O07",
        "text": "No me importa",
        "out_of_scale": true
      }
    ],
    "next_logic": "return 'P31';",
    "condition": "return getAns('P24').includes('P24_O07');"
  },
  {
    "id": "P31",
    "type": "single",
    "optional": true,
    "text": "Cuando tú buscas sexo o un encuentro erótico, ¿qué suele pasar?",
    "options": [
      {
        "id": "P31_O01",
        "text": "Casi siempre tiene ganas"
      },
      {
        "id": "P31_O02",
        "text": "Muchas veces tiene ganas"
      },
      {
        "id": "P31_O03",
        "text": "Depende"
      },
      {
        "id": "P31_O04",
        "text": "Pocas veces tiene ganas"
      },
      {
        "id": "P31_O05",
        "text": "Casi nunca tiene ganas"
      },
      {
        "id": "P31_O06",
        "text": "No suelo tomar la iniciativa"
      },
      {
        "id": "P31_O07",
        "text": "Nunca tomo la iniciativa"
      },
      {
        "id": "P31_O08",
        "text": "No lo tengo claro"
      }
    ],
    "next_logic": "return 'P32';",
    "condition": "return getAns('P24').includes('P24_O09');"
  },
  {
    "id": "P32",
    "type": "gradient_spatial",
    "text": "¿Los espacios y condiciones en que vives te dan la privacidad que necesitas para tu vida erótica?",
    "options": [
      {
        "id": "P32_O01",
        "text": "Sí, completamente"
      },
      {
        "id": "P32_O02",
        "text": "La mayor parte del tiempo"
      },
      {
        "id": "P32_O03",
        "text": "A veces"
      },
      {
        "id": "P32_O04",
        "text": "Pocas veces"
      },
      {
        "id": "P32_O05",
        "text": "No"
      },
      {
        "id": "P32_O06",
        "text": "Depende",
        "out_of_scale": true
      },
      {
        "id": "P32_O07",
        "text": "No lo tengo claro",
        "out_of_scale": true
      }
    ],
    "next_logic": "return 'END';",
    "condition": "return getAns('P20').includes('P20_O09') || getAns('P24').includes('P24_O12');"
  },
  {
    "id": "END",
    "type": "landscape",
    "title": "MAPA COMPLETADO",
    "text": "Tus respuestas se han guardado exitosamente. Muy pronto podrás ver tu configuración.",
    "next": null
  }
];