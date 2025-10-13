# Componente Faixa Karatê

Este componente exibe uma representação visual realística de uma faixa de karatê com cor personalizada, informações de grau e efeitos visuais que simulam costuras reais.

## Características Visuais

- ✨ **6 Costuras paralelas**: Costuras horizontais distribuídas uniformemente pela faixa
- 🎨 **Textura sutil**: Padrão de textura que imita o tecido da faixa
- 🌟 **Sombras realistas**: Box-shadow e inset-shadow para profundidade
- 📱 **Design responsivo**: Adapta-se a diferentes tamanhos de tela
- 🧵 **Padrão pontilhado**: Efeito de costura com padrão realista

## Uso

```html
<app-faixa-karate 
  [corHex]="'#000000'" 
  [nomeCor]="'Preta'" 
  [grau]="'1º Dan'">
</app-faixa-karate>
```

## Propriedades

| Propriedade | Tipo   | Obrigatório | Descrição                        |
|-------------|--------|-------------|----------------------------------|
| corHex      | string | Sim         | Código hexadecimal da cor        |
| nomeCor     | string | Sim         | Nome da cor por extenso          |
| grau        | string | Sim         | Grau da graduação                |

## Exemplos

### Faixa Branca
```html
<app-faixa-karate 
  [corHex]="'#FFFFFF'" 
  [nomeCor]="'Branca'" 
  [grau]="'Iniciante'">
</app-faixa-karate>
```

### Faixa Amarela
```html
<app-faixa-karate 
  [corHex]="'#FFD700'" 
  [nomeCor]="'Amarela'" 
  [grau]="'8º Kyu'">
</app-faixa-karate>
```

### Faixa Preta
```html
<app-faixa-karate 
  [corHex]="'#000000'" 
  [nomeCor]="'Preta'" 
  [grau]="'1º Dan'">
</app-faixa-karate>
```

## Importação

```typescript
import { FaixaKarateComponent } from './path/to/faixa-karate.component';

// No seu componente ou módulo
@Component({
  imports: [FaixaKarateComponent]
  // ...
})
```
