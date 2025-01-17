import { SupaDatabase } from '../types/supabase';
import { Conversation, Message } from '@/types/chat';

import { SupabaseClient } from '@supabase/supabase-js';

import { PossibleAiModels } from '@/types/ai-models';

import {
  DEFAULT_MODEL
} from '@/utils/app/const';

export const supaCreateConversation = async (
  supabase: SupabaseClient<SupaDatabase>,
  newConversation: Conversation,
) => {
  const supaConversation: SupaDatabase['public']['Tables']['conversations']['Insert'] =
    {
      id: newConversation.id,
      name: newConversation.name,
      model_id: newConversation.model?.id || PossibleAiModels[DEFAULT_MODEL].id,
      system_prompt_id: newConversation.systemPrompt?.id,
      temperature: newConversation.temperature,
      folder_id: newConversation.folderId,
      timestamp: newConversation.timestamp,
    };

  const { error } = await supabase
    .from('conversations')
    .insert(supaConversation);

  if (error) {
    console.error(error);
    return false;
  }
  return true;
};

export const supaUpdateConversation = async (
  supabase: SupabaseClient<SupaDatabase>,
  updatedConversation: Conversation,
) => {
  const { error } = await supabase
    .from('conversations')
    .upsert({
      id: updatedConversation.id,
      name: updatedConversation.name,
      model_id: updatedConversation.model?.id || PossibleAiModels[DEFAULT_MODEL].id,
      system_prompt_id: updatedConversation.systemPrompt?.id,
      temperature: updatedConversation.temperature,
      folder_id: updatedConversation.folderId,
      timestamp: updatedConversation.timestamp,
    })
    .eq('id', updatedConversation.id);

  if (error) {
    console.error(error);
    return false;
  }
  return true;
};

export const supaDeleteConversation = async (
  supabase: SupabaseClient<SupaDatabase>,
  conversationId: string,
) => {
  const { error } = await supabase
    .from('conversations')
    .delete()
    .match({ id: conversationId });

  if (error) {
    console.error(error);
    return false;
  }
  return true;
};
