# Exemplo de Uso do Componente AtletaDadosPessoaisForm

## Componente Completo

O componente `AtletaDadosPessoaisFormComponent` está pronto para uso com as seguintes funcionalidades:

### Características:

✅ **Formulário Reativo**: Utiliza Angular Reactive Forms com FormBuilder
✅ **Validação Completa**: Validadores para todos os campos obrigatórios
✅ **Material Design**: Interface moderna com Angular Material
✅ **Responsive**: Layout adaptável para dispositivos móveis
✅ **Mensagens de Erro**: Feedback específico para cada tipo de erro
✅ **Type Safety**: Interface TypeScript para dados do atleta
✅ **Eventos**: Emite mudanças de dados e validação

### Como usar:

```html
<app-atleta-dados-pessoais-form
  [initialData]="atletaData"
  [readonly]="false"
  (formDataChange)="onDataChange($event)"
  (formValidChange)="onValidChange($event)">
</app-atleta-dados-pessoais-form>
```

### No componente pai:

```typescript
export class AtletaPageComponent {
  atletaData: AtletaDadosPessoais = {
    nomeAtleta: 'João Silva',
    dataNascimento: '1995-05-15',
    sexo: 'M',
    nacionalidade: 'Brasileira',
    naturalidade: 'São Paulo - SP'
  };

  onDataChange(data: AtletaDadosPessoais) {
    console.log('Dados alterados:', data);
  }

  onValidChange(isValid: boolean) {
    console.log('Formulário válido:', isValid);
  }
}
```

### Campos do Formulário:

1. **Nome do Atleta** (obrigatório)
   - Validação: mínimo 2 caracteres, máximo 100, apenas letras e espaços

2. **Data de Nascimento** (obrigatório)
   - Validação: data não pode ser futura nem anterior a 100 anos

3. **Sexo** (obrigatório)
   - Opções: Masculino (M) ou Feminino (F)

4. **Nacionalidade** (opcional)
   - Padrão: "Brasileira"
   - Validação: máximo 50 caracteres, apenas letras e espaços

5. **Naturalidade** (opcional)
   - Validação: máximo 100 caracteres, apenas letras e espaços

6. **Nome do Pai** (opcional)
   - Validação: máximo 100 caracteres, apenas letras e espaços

7. **Nome da Mãe** (opcional)
   - Validação: máximo 100 caracteres, apenas letras e espaços

### Métodos Públicos:

- `getFormData()`: Retorna os dados do formulário
- `isFormValid()`: Verifica se o formulário é válido
- `markAllFieldsAsTouched()`: Marca todos os campos como tocados
- `resetForm()`: Reseta o formulário
- `updateFormData(data)`: Atualiza dados específicos do formulário

### Interface de Dados:

```typescript
interface AtletaDadosPessoais {
  nomeAtleta: string;
  dataNascimento: string;
  sexo: 'M' | 'F';
  nacionalidade?: string;
  naturalidade?: string;
  nomePai?: string;
  nomeMae?: string;
}
```

## Estrutura de Arquivos Criada:

```
atleta-dados-pessoais-form/
├── atleta-dados-pessoais-form.ts       # Componente TypeScript
├── atleta-dados-pessoais-form.html     # Template HTML
├── atleta-dados-pessoais-form.scss     # Estilos SCSS
└── exemplo-uso.md                       # Este arquivo
```

O componente está totalmente funcional e pode ser integrado ao sistema de cadastro de atletas.
