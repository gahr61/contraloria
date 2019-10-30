<?php

use Illuminate\Database\Seeder;

class ElementCompSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('elemento_comp')->delete();
     
     	//ptc inst
        DB::table('elemento_comp')->insert([
          	'nombre' => 'Los servidores públicos de la Institución, conocen y aseguran en su área de trabajo el cumplimiento de metas y objetivos, visión y misión institucionales (Institucional)',
          	'componente_id'=> 1
		]);
		DB::table('elemento_comp')->insert([
          	'nombre' => 'Los objetivos y metas institucionales derivados del plan estratégico están comunicados y asignados a los encargados de las áreas y responsables de cada uno de los procesos para su cumplimiento (Institucional)',
          	'componente_id'=> 1
		]);
		DB::table('elemento_comp')->insert([
          	'nombre' => 'La institución cuenta con un Comité de Ética y de Prevención de Conflictos de Interés formalmente establecido para difundir y evaluar el cumplimiento del Código de Ética y de Conducta; se cumplen con las reglas de integridad para el ejercicio de la función pública y sus lineamientos generales (Institucional)',
          	'componente_id'=> 1
		]);
		DB::table('elemento_comp')->insert([
          	'nombre' => 'Se aplican, al menos una vez al año, encuestas de clima organizacional, se identifican áreas de oportunidad, determinan acciones de mejora, dan seguimiento y evalúan sus resultados (Institucional)',
          	'componente_id'=> 1
		]);
		DB::table('elemento_comp')->insert([
          	'nombre' => 'Los perfiles y descripciones de puestos están actualizados conforme a las funciones y alineados a los procesos (Institucional)',
          	'componente_id'=> 1
		]);

		DB::table('elemento_comp')->insert([
          	'nombre' => 'Se cumple con las políticas y disposiciones establecidas para la Estrategia Digital Nacional en los procesos de gobernanza, organización y de entrega, relacionados con la planeación, contratación y administración de bienes y servicios de TIC’s y con la seguridad de la información  (Institucional TIC’s)',
          	'componente_id'=> 2
		]);

		DB::table('elemento_comp')->insert([
          	'nombre' => 'Se tiene implantado un mecanismo específico para el registro, análisis y atención oportuna y suficiente de quejas y denuncias (Institucional)',
          	'componente_id'=> 3
		]);		
		DB::table('elemento_comp')->insert([
          	'nombre' => 'Se cuenta con un sistema de Información que de manera integral, oportuna y confiable permite a la alta dirección y, en su caso, al Órgano de Gobierno realizar seguimientos y tomar decisiones (Institucional)',
          	'componente_id'=> 3
		]);

		//rep inst
		DB::table('elemento_comp')->insert([
          	'nombre' => 'Los servidores públicos de la Institución, conocen y aseguran en su área de trabajo el cumplimiento de metas y objetivos, visión y misión institucionales (Institucional)',
          	'componente_id'=> 4
		]);
		DB::table('elemento_comp')->insert([
          	'nombre' => 'Los objetivos y metas institucionales derivados del plan estratégico están comunicados y asignados a los encargados de las áreas y responsables de cada uno de los procesos para su cumplimiento (Institucional)',
          	'componente_id'=> 4
		]);
		DB::table('elemento_comp')->insert([
          	'nombre' => 'La institución cuenta con un Comité de Ética y de Prevención de Conflictos de Interés formalmente establecido para difundir y evaluar el cumplimiento del Código de Ética y de Conducta; se cumplen con las reglas de integridad para el ejercicio de la función pública y sus lineamientos generales (Institucional)',
          	'componente_id'=> 4
		]);
		DB::table('elemento_comp')->insert([
          	'nombre' => 'Se aplican, al menos una vez al año, encuestas de clima organizacional, se identifican áreas de oportunidad, determinan acciones de mejora, dan seguimiento y evalúan sus resultados (Institucional)',
          	'componente_id'=> 4
		]);
		DB::table('elemento_comp')->insert([
          	'nombre' => 'Los perfiles y descripciones de puestos están actualizados conforme a las funciones y alineados a los procesos (Institucional)',
          	'componente_id'=> 4
		]);

		DB::table('elemento_comp')->insert([
          	'nombre' => 'Se cumple con las políticas y disposiciones establecidas para la Estrategia Digital Nacional en los procesos de gobernanza, organización y de entrega, relacionados con la planeación, contratación y administración de bienes y servicios de TIC’s y con la seguridad de la información  (Institucional TIC’s)',
          	'componente_id'=> 5
		]);

		DB::table('elemento_comp')->insert([
          	'nombre' => 'Se tiene implantado un mecanismo específico para el registro, análisis y atención oportuna y suficiente de quejas y denuncias (Institucional)',
          	'componente_id'=> 6
		]);		
		DB::table('elemento_comp')->insert([
          	'nombre' => 'Se cuenta con un sistema de Información que de manera integral, oportuna y confiable permite a la alta dirección y, en su caso, al Órgano de Gobierno realizar seguimientos y tomar decisiones (Institucional)',
          	'componente_id'=> 6
		]);

		//ptc esp
		DB::table('elemento_comp')->insert([
          	'nombre' => 'La estructura organizacional define la autoridad y responsabilidad, segrega y delega funciones, delimita facultades entre el personal que autoriza, ejecuta, vigila, evalúa, registra o contabiliza las transacciones de los procesos',
          	'componente_id'=> 7
		]);
		DB::table('elemento_comp')->insert([
          	'nombre' => 'El manual de organización y de procedimientos de las unidades administrativas que intervienen en los procesos está alineado a los objetivos y metas institucionales y se actualizan con base en sus atribuciones y responsabilidades establecidas en la normatividad aplicable',
          	'componente_id'=> 7
		]);
		DB::table('elemento_comp')->insert([
          	'nombre' => 'Se opera en el proceso un mecanismo para evaluar y actualizar el control interno (políticas y procedimientos), en cada ámbito de competencia y nivel jerárquico',
          	'componente_id'=> 7
		]);

		DB::table('elemento_comp')->insert([
          	'nombre' => 'Se aplica la metodología establecida en cumplimiento a las etapas para la Administración de Riesgos, para su identificación, descripción, evaluación, atención y seguimiento, que incluya los factores de riesgo, estrategias para administrarlos y la implementación de acciones de control',
          	'componente_id'=> 8
		]);
		DB::table('elemento_comp')->insert([
          	'nombre' => 'Las actividades de control interno atienden y mitigan los riesgos identificados del proceso, que pueden afectar el logro de metas y objetivos institucionales, y éstas son ejecutadas por el servidor público facultado conforme a la normatividad',
          	'componente_id'=> 8
		]);
		DB::table('elemento_comp')->insert([
          	'nombre' => 'Existe un procedimiento formal que establezca la obligación de los responsables de los procesos que intervienen en la administración de riesgos',
          	'componente_id'=> 8
		]);
		DB::table('elemento_comp')->insert([
          	'nombre' => 'Se instrumentan en los procesos acciones para identificar, evaluar y dar respuesta a los riesgos de corrupción, abusos y fraudes potenciales que pudieran afectar el cumplimiento de los objetivos institucionales',
          	'componente_id'=> 8
		]);

		DB::table('elemento_comp')->insert([
          	'nombre' => 'Se seleccionan y desarrollan actividades de control que ayudan a dar respuesta y reducir los riesgos de cada proceso, considerando los controles manuales y/o automatizados con base en el uso de TIC´s',
          	'componente_id'=> 9
		]);
		DB::table('elemento_comp')->insert([
          	'nombre' => 'Se encuentran claramente definidas las actividades de control en cada proceso, para cumplir con las metas comprometidas con base en el presupuesto asignado del ejercicio fiscal',
          	'componente_id'=> 9
		]);
		DB::table('elemento_comp')->insert([
          	'nombre' => 'Se tienen en operación los instrumentos y mecanismos del proceso, que miden su avance, resultados y se analizan las variaciones en el cumplimiento de los objetivos y metas Institucionales',
          	'componente_id'=> 9
		]);
		DB::table('elemento_comp')->insert([
          	'nombre' => 'Se tienen establecidos estándares de calidad, resultados, servicios o desempeño en la ejecución  de los procesos',
          	'componente_id'=> 9
		]);
		DB::table('elemento_comp')->insert([
          	'nombre' => 'Se establecen en los procesos mecanismos para identificar y atender la causa raíz de las observaciones determinadas por las diversas instancias de fiscalización, con la finalidad de evitar  su recurrencia',
          	'componente_id'=> 9
		]);
		DB::table('elemento_comp')->insert([
          	'nombre' => 'Se identifica en los procesos la causa raíz de las debilidades de control interno determinadas, con prioridad en las de mayor importancia, a efecto de evitar su recurrencia e integrarlas a un Programa de Trabajo de Control Interno para su seguimiento y atención',
          	'componente_id'=> 9
		]);
		DB::table('elemento_comp')->insert([
          	'nombre' => 'Se evalúan y actualizan en los procesos las políticas, procedimientos, acciones, mecanismos e instrumentos de control',
          	'componente_id'=> 9
		]);
		DB::table('elemento_comp')->insert([
          	'nombre' => 'Las recomendaciones y acuerdos de los Comités Institucionales, relacionados con cada proceso, se atienden en tiempo y forma, conforme a su ámbito de competencia',
          	'componente_id'=> 9
		]);
		DB::table('elemento_comp')->insert([
          	'nombre' => 'Existen y operan en los procesos actividades de control desarrolladas mediante el uso de TIC’s',
          	'componente_id'=> 9
		]);
		DB::table('elemento_comp')->insert([
          	'nombre' => 'Se identifican y evalúan las necesidades de utilizar TIC’s en las operaciones y etapas del proceso, considerando los recursos humanos, materiales, financieros y tecnológicos que se requieren',
          	'componente_id'=> 9
		]);
		DB::table('elemento_comp')->insert([
          	'nombre' => 'En las operaciones y etapas automatizadas de los procesos se cancelan oportunamente los accesos autorizados del personal que causó baja, tanto a espacios físicos como a TIC’s',
          	'componente_id'=> 9
		]);

		DB::table('elemento_comp')->insert([
          	'nombre' => 'Existe en cada proceso un mecanismo para generar información relevante y de calidad (accesible, correcta, actualizada, suficiente, oportuna, válida y verificable), de conformidad con las disposiciones legales y administrativas aplicables',
          	'componente_id'=> 10
		]);
		DB::table('elemento_comp')->insert([
          	'nombre' => 'Se tiene implantado en cada proceso un mecanismo o instrumento para verificar que la elaboración de informes, respecto del logro del plan estratégico, objetivos y metas institucionales, cumplan con las políticas, lineamientos y criterios institucionales establecidos',
          	'componente_id'=> 10
		]);
		DB::table('elemento_comp')->insert([
          	'nombre' => 'Dentro del sistema de información se genera de manera oportuna, suficiente y confiable, información sobre el estado de la situación contable y programático-presupuestal del proceso',
          	'componente_id'=> 10
		]);
		DB::table('elemento_comp')->insert([
          	'nombre' => 'Se cuenta con el registro de acuerdos y compromisos, correspondientes a los procesos, aprobados en las reuniones del Órgano de Gobierno, de Comités Institucionales y de grupos de alta dirección, así como de su seguimiento, a fin de que se cumplan en tiempo y forma',
          	'componente_id'=> 10
		]);

		DB::table('elemento_comp')->insert([
          	'nombre' => 'Se realizan las acciones correctivas y preventivas que contribuyen a la eficiencia y eficacia de las operaciones, así como la supervisión permanente de los cinco componentes de control interno',
          	'componente_id'=> 11
		]);
		DB::table('elemento_comp')->insert([
          	'nombre' => 'Los resultados de las auditorías de instancias fiscalizadoras de cumplimiento, de riesgos, de funciones, evaluaciones y de seguridad sobre Tecnologías de la Información, se utilizan para retroalimentar a cada uno de los responsables y mejorar el proceso',
          	'componente_id'=> 11
		]);
		DB::table('elemento_comp')->insert([
          	'nombre' => 'Se llevan a cabo evaluaciones del control interno de los procesos sustantivos y administrativos por parte del Titular y la Administración, Órgano Fiscalizador o de una instancia independiente para determinar la suficiencia y efectividad de los controles establecidos',
          	'componente_id'=> 11
		]);

		//rep esp
		DB::table('elemento_comp')->insert([
          	'nombre' => 'La estructura organizacional define la autoridad y responsabilidad, segrega y delega funciones, delimita facultades entre el personal que autoriza, ejecuta, vigila, evalúa, registra o contabiliza las transacciones de los procesos',
          	'componente_id'=> 12
		]);
		DB::table('elemento_comp')->insert([
          	'nombre' => 'El manual de organización y de procedimientos de las unidades administrativas que intervienen en los procesos está alineado a los objetivos y metas institucionales y se actualizan con base en sus atribuciones y responsabilidades establecidas en la normatividad aplicable',
          	'componente_id'=> 12
		]);
		DB::table('elemento_comp')->insert([
          	'nombre' => 'Se opera en el proceso un mecanismo para evaluar y actualizar el control interno (políticas y procedimientos), en cada ámbito de competencia y nivel jerárquico',
          	'componente_id'=> 12
		]);

		DB::table('elemento_comp')->insert([
          	'nombre' => 'Se aplica la metodología establecida en cumplimiento a las etapas para la Administración de Riesgos, para su identificación, descripción, evaluación, atención y seguimiento, que incluya los factores de riesgo, estrategias para administrarlos y la implementación de acciones de control',
          	'componente_id'=> 13
		]);
		DB::table('elemento_comp')->insert([
          	'nombre' => 'Las actividades de control interno atienden y mitigan los riesgos identificados del proceso, que pueden afectar el logro de metas y objetivos institucionales, y éstas son ejecutadas por el servidor público facultado conforme a la normatividad',
          	'componente_id'=> 13
		]);
		DB::table('elemento_comp')->insert([
          	'nombre' => 'Existe un procedimiento formal que establezca la obligación de los responsables de los procesos que intervienen en la administración de riesgos',
          	'componente_id'=> 13
		]);
		DB::table('elemento_comp')->insert([
          	'nombre' => 'Se instrumentan en los procesos acciones para identificar, evaluar y dar respuesta a los riesgos de corrupción, abusos y fraudes potenciales que pudieran afectar el cumplimiento de los objetivos institucionales',
          	'componente_id'=> 13
		]);

		DB::table('elemento_comp')->insert([
          	'nombre' => 'Se seleccionan y desarrollan actividades de control que ayudan a dar respuesta y reducir los riesgos de cada proceso, considerando los controles manuales y/o automatizados con base en el uso de TIC´s',
          	'componente_id'=> 14
		]);
		DB::table('elemento_comp')->insert([
          	'nombre' => 'Se encuentran claramente definidas las actividades de control en cada proceso, para cumplir con las metas comprometidas con base en el presupuesto asignado del ejercicio fiscal',
          	'componente_id'=> 14
		]);
		DB::table('elemento_comp')->insert([
          	'nombre' => 'Se tienen en operación los instrumentos y mecanismos del proceso, que miden su avance, resultados y se analizan las variaciones en el cumplimiento de los objetivos y metas Institucionales',
          	'componente_id'=> 14
		]);
		DB::table('elemento_comp')->insert([
          	'nombre' => 'Se tienen establecidos estándares de calidad, resultados, servicios o desempeño en la ejecución  de los procesos',
          	'componente_id'=> 14
		]);
		DB::table('elemento_comp')->insert([
          	'nombre' => 'Se establecen en los procesos mecanismos para identificar y atender la causa raíz de las observaciones determinadas por las diversas instancias de fiscalización, con la finalidad de evitar  su recurrencia',
          	'componente_id'=> 14
		]);
		DB::table('elemento_comp')->insert([
          	'nombre' => 'Se identifica en los procesos la causa raíz de las debilidades de control interno determinadas, con prioridad en las de mayor importancia, a efecto de evitar su recurrencia e integrarlas a un Programa de Trabajo de Control Interno para su seguimiento y atención',
          	'componente_id'=> 14
		]);
		DB::table('elemento_comp')->insert([
          	'nombre' => 'Se evalúan y actualizan en los procesos las políticas, procedimientos, acciones, mecanismos e instrumentos de control',
          	'componente_id'=> 14
		]);
		DB::table('elemento_comp')->insert([
          	'nombre' => 'Las recomendaciones y acuerdos de los Comités Institucionales, relacionados con cada proceso, se atienden en tiempo y forma, conforme a su ámbito de competencia',
          	'componente_id'=> 14
		]);
		DB::table('elemento_comp')->insert([
          	'nombre' => 'Existen y operan en los procesos actividades de control desarrolladas mediante el uso de TIC’s',
          	'componente_id'=> 14
		]);
		DB::table('elemento_comp')->insert([
          	'nombre' => 'Se identifican y evalúan las necesidades de utilizar TIC’s en las operaciones y etapas del proceso, considerando los recursos humanos, materiales, financieros y tecnológicos que se requieren',
          	'componente_id'=> 14
		]);
		DB::table('elemento_comp')->insert([
          	'nombre' => 'En las operaciones y etapas automatizadas de los procesos se cancelan oportunamente los accesos autorizados del personal que causó baja, tanto a espacios físicos como a TIC’s',
          	'componente_id'=> 14
		]);

		DB::table('elemento_comp')->insert([
          	'nombre' => 'Existe en cada proceso un mecanismo para generar información relevante y de calidad (accesible, correcta, actualizada, suficiente, oportuna, válida y verificable), de conformidad con las disposiciones legales y administrativas aplicables',
          	'componente_id'=> 15
		]);
		DB::table('elemento_comp')->insert([
          	'nombre' => 'Se tiene implantado en cada proceso un mecanismo o instrumento para verificar que la elaboración de informes, respecto del logro del plan estratégico, objetivos y metas institucionales, cumplan con las políticas, lineamientos y criterios institucionales establecidos',
          	'componente_id'=> 15
		]);
		DB::table('elemento_comp')->insert([
          	'nombre' => 'Dentro del sistema de información se genera de manera oportuna, suficiente y confiable, información sobre el estado de la situación contable y programático-presupuestal del proceso',
          	'componente_id'=> 15
		]);
		DB::table('elemento_comp')->insert([
          	'nombre' => 'Se cuenta con el registro de acuerdos y compromisos, correspondientes a los procesos, aprobados en las reuniones del Órgano de Gobierno, de Comités Institucionales y de grupos de alta dirección, así como de su seguimiento, a fin de que se cumplan en tiempo y forma',
          	'componente_id'=> 15
		]);

		DB::table('elemento_comp')->insert([
          	'nombre' => 'Se realizan las acciones correctivas y preventivas que contribuyen a la eficiencia y eficacia de las operaciones, así como la supervisión permanente de los cinco componentes de control interno',
          	'componente_id'=> 16
		]);
		DB::table('elemento_comp')->insert([
          	'nombre' => 'Los resultados de las auditorías de instancias fiscalizadoras de cumplimiento, de riesgos, de funciones, evaluaciones y de seguridad sobre Tecnologías de la Información, se utilizan para retroalimentar a cada uno de los responsables y mejorar el proceso',
          	'componente_id'=> 16
		]);
		DB::table('elemento_comp')->insert([
          	'nombre' => 'Se llevan a cabo evaluaciones del control interno de los procesos sustantivos y administrativos por parte del Titular y la Administración, Órgano Fiscalizador o de una instancia independiente para determinar la suficiencia y efectividad de los controles establecidos',
          	'componente_id'=> 16
		]);
    }
}
