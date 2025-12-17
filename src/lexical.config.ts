import {
  LexicalEditorProps,
  BoldFeature,
  ItalicFeature,
  UnderlineFeature,
  StrikethroughFeature,
  SubscriptFeature,
  SuperscriptFeature,
  InlineCodeFeature,
  ParagraphFeature,
  HeadingFeature,
  OrderedListFeature,
  LinkFeature,
  BlockquoteFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  FixedToolbarFeature,
  UnorderedListFeature,
} from '@payloadcms/richtext-lexical'

const lexicalConfig: LexicalEditorProps = {
  features: [
    BoldFeature(),
    ItalicFeature(),
    UnderlineFeature(),
    StrikethroughFeature(),
    SubscriptFeature(),
    SuperscriptFeature(),
    InlineCodeFeature(),
    ParagraphFeature(),
    HeadingFeature(),
    UnorderedListFeature(),
    OrderedListFeature(),
    // disable internal links
    LinkFeature({ enabledCollections: [] }),
    BlockquoteFeature(),
    HorizontalRuleFeature(),
    InlineToolbarFeature(),
    FixedToolbarFeature(),
  ],
}

export default lexicalConfig
